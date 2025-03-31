
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Pen, Eraser, MousePointer, Square, Circle, Type, 
  Download, Trash2, MinusSquare, SlidersHorizontal,
  Image, FileUp, Paperclip
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

type DrawingMode = 'pen' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'text';

interface WhiteboardControlsProps {
  mode: DrawingMode;
  setMode: (mode: DrawingMode) => void;
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  onClear: () => void;
  onDownload: () => void;
}

const WhiteboardControls: React.FC<WhiteboardControlsProps> = ({
  mode,
  setMode,
  color,
  setColor,
  brushSize,
  setBrushSize,
  onClear,
  onDownload,
}) => {
  const colors = [
    '#000000', '#e03131', '#2f9e44', '#1971c2', 
    '#f08c00', '#9c36b5', '#0ca678', '#666666'
  ];

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Here we would normally process the file
      // For now, just show a toast
      toast.success(`File "${files[0].name}" attached successfully!`);
      
      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="glass-dark rounded-lg p-3 flex flex-wrap items-center gap-2">
      <div className="flex items-center space-x-1 mr-2">
        <Button
          size="icon"
          variant={mode === 'pen' ? 'default' : 'secondary'}
          className="rounded-lg h-9 w-9"
          onClick={() => setMode('pen')}
        >
          <Pen className="h-4 w-4" />
        </Button>
        
        <Button
          size="icon"
          variant={mode === 'eraser' ? 'default' : 'secondary'}
          className="rounded-lg h-9 w-9"
          onClick={() => setMode('eraser')}
        >
          <Eraser className="h-4 w-4" />
        </Button>
        
        <Button
          size="icon"
          variant={mode === 'line' ? 'default' : 'secondary'}
          className="rounded-lg h-9 w-9"
          onClick={() => setMode('line')}
        >
          <MinusSquare className="h-4 w-4" />
        </Button>
        
        <Button
          size="icon"
          variant={mode === 'rectangle' ? 'default' : 'secondary'}
          className="rounded-lg h-9 w-9"
          onClick={() => setMode('rectangle')}
        >
          <Square className="h-4 w-4" />
        </Button>
        
        <Button
          size="icon"
          variant={mode === 'circle' ? 'default' : 'secondary'}
          className="rounded-lg h-9 w-9"
          onClick={() => setMode('circle')}
        >
          <Circle className="h-4 w-4" />
        </Button>
        
        <Button
          size="icon"
          variant={mode === 'text' ? 'default' : 'secondary'}
          className="rounded-lg h-9 w-9"
          onClick={() => setMode('text')}
        >
          <Type className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="h-6 border-r border-white/20 mx-2 hidden sm:block" />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-lg h-9 w-9 relative"
          >
            <div
              className="absolute inset-2 rounded-full border border-white/20"
              style={{ backgroundColor: color }}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 glass-dark border-white/20">
          <div className="grid grid-cols-4 gap-1">
            {colors.map((c) => (
              <button
                key={c}
                className="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform"
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <div className="flex items-center space-x-2 ml-2 hidden md:flex">
        <SlidersHorizontal className="h-4 w-4 text-white/70" />
        <Slider
          className="w-20"
          value={[brushSize]}
          min={1}
          max={20}
          step={1}
          onValueChange={(value) => setBrushSize(value[0])}
        />
      </div>
      
      <div className="ml-auto flex items-center space-x-1">
        <Button
          size="icon"
          variant="outline"
          className="rounded-lg h-9 w-9"
          onClick={handleFileButtonClick}
        >
          <Paperclip className="h-4 w-4" />
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </Button>
        
        <Button
          size="icon"
          variant="outline"
          className="rounded-lg h-9 w-9"
          onClick={onDownload}
        >
          <Download className="h-4 w-4" />
        </Button>
        
        <Button
          size="icon"
          variant="outline"
          className="rounded-lg h-9 w-9 text-destructive hover:text-destructive"
          onClick={onClear}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WhiteboardControls;
