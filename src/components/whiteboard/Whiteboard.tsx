
import React, { useState, useRef, useEffect } from 'react';
import WhiteboardControls from './WhiteboardControls';
import { toast } from 'sonner';

type DrawingMode = 'pen' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'text';

interface WhiteboardProps {
  className?: string;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<DrawingMode>('pen');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [savedImageData, setSavedImageData] = useState<ImageData | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      // Fill with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Set initial context properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setContext(ctx);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  // Handle file drops on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (canvas) {
        canvas.classList.add('border-primary', 'border-2');
      }
    };
    
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (canvas) {
        canvas.classList.remove('border-primary', 'border-2');
      }
    };
    
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (canvas) {
        canvas.classList.remove('border-primary', 'border-2');
      }
      
      if (!e.dataTransfer) return;
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const fileArray = Array.from(files);
        setAttachedFiles(prev => [...prev, ...fileArray]);
        
        // Show toast notification
        toast.success(`${files.length} file(s) attached successfully!`);
        
        // If it's an image, we can display it on the canvas
        if (files[0].type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result && context && canvasRef.current) {
              const img = new Image();
              img.onload = () => {
                const aspectRatio = img.width / img.height;
                const maxWidth = canvasRef.current!.width * 0.5; // 50% of canvas width
                const maxHeight = canvasRef.current!.height * 0.5; // 50% of canvas height
                
                let newWidth, newHeight;
                if (img.width > img.height) {
                  newWidth = Math.min(img.width, maxWidth);
                  newHeight = newWidth / aspectRatio;
                } else {
                  newHeight = Math.min(img.height, maxHeight);
                  newWidth = newHeight * aspectRatio;
                }
                
                // Center the image
                const x = (canvasRef.current!.width - newWidth) / 2;
                const y = (canvasRef.current!.height - newHeight) / 2;
                
                context.drawImage(img, x, y, newWidth, newHeight);
              };
              img.src = event.target.result as string;
            }
          };
          reader.readAsDataURL(files[0]);
        }
      }
    };
    
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('dragleave', handleDragLeave);
    canvas.addEventListener('drop', handleDrop);
    
    return () => {
      canvas.removeEventListener('dragover', handleDragOver);
      canvas.removeEventListener('dragleave', handleDragLeave);
      canvas.removeEventListener('drop', handleDrop);
    };
  }, [context]);
  
  // Handle drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context || !canvasRef.current) return;
    
    setIsDrawing(true);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPoint({ x, y });
    
    if (mode === 'pen' || mode === 'eraser') {
      context.beginPath();
      context.moveTo(x, y);
    } else {
      // Save the current canvas state for shape drawing
      setSavedImageData(context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.lineWidth = brushSize;
    
    if (mode === 'pen') {
      context.strokeStyle = color;
      context.lineTo(x, y);
      context.stroke();
    } else if (mode === 'eraser') {
      context.strokeStyle = '#ffffff';
      context.lineTo(x, y);
      context.stroke();
    } else if (savedImageData) {
      // Restore canvas state and draw the shape preview
      context.putImageData(savedImageData, 0, 0);
      context.strokeStyle = color;
      
      switch (mode) {
        case 'line':
          context.beginPath();
          context.moveTo(startPoint.x, startPoint.y);
          context.lineTo(x, y);
          context.stroke();
          break;
        case 'rectangle':
          context.strokeRect(
            startPoint.x, 
            startPoint.y, 
            x - startPoint.x, 
            y - startPoint.y
          );
          break;
        case 'circle':
          const radius = Math.sqrt(
            Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
          );
          context.beginPath();
          context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
          context.stroke();
          break;
        default:
          break;
      }
    }
  };
  
  const endDrawing = () => {
    if (!context) return;
    
    setIsDrawing(false);
    context.closePath();
    setSavedImageData(null);
  };
  
  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setAttachedFiles([]);
    toast.info("Whiteboard cleared");
  };
  
  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    toast.success("Whiteboard downloaded successfully");
  };
  
  return (
    <div className={`flex flex-col ${className}`}>
      <WhiteboardControls 
        mode={mode}
        setMode={setMode}
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        onClear={clearCanvas}
        onDownload={downloadCanvas}
      />
      
      <div className="flex-1 relative border border-border rounded-lg mt-4 overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair transition-all duration-200"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />
        
        {attachedFiles.length > 0 && (
          <div className="absolute bottom-4 right-4 glass-dark p-2 rounded-lg text-xs text-white/80">
            {attachedFiles.length} file(s) attached
          </div>
        )}
      </div>
    </div>
  );
};

export default Whiteboard;
