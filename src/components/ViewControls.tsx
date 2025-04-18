import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { ViewerState, ViewMode, ColorScheme } from '@/types/viewer';
import { Molecule } from '@/utils/pdbParser';
import { useVisualizeStore } from '@/store/visualizeStore';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface ViewerControlsProps {
  viewerState: ViewerState;
  molecules: { file: File; molecule?: Molecule }[];
  selectedMoleculeIndex: number | null;
  onViewModeChange: (mode: ViewMode) => void;
  onAtomSizeChange: (size: number) => void;
  onLigandVisibilityChange: (visible: boolean) => void;
  onWaterIonVisibilityChange: (visible: boolean) => void;
  onColorSchemeChange: (scheme: ColorScheme) => void;
  onFilesUploaded: (files: File[]) => void;
  onDeleteMolecule: (index: number) => void;
  onSelectMolecule: (index: number) => void;
}

export function ViewControls({
  viewerState,
  molecules,
  selectedMoleculeIndex,
  onViewModeChange,
  onAtomSizeChange,
  onLigandVisibilityChange,
  onWaterIonVisibilityChange,
  onColorSchemeChange,
  onFilesUploaded,
  onDeleteMolecule,
  onSelectMolecule
}: ViewerControlsProps) {
  // Get the loaded structures from the store
  const { loadedStructures, setSelectedFileIndex } = useVisualizeStore();

  const handleDeleteFile = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selection when clicking delete
    
    // Call the deletion handler with proper error handling
    try {
      onDeleteMolecule(index);
      console.log('File deleted successfully at index:', index);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // Safe structure selection handler
  const handleStructureSelect = (index: number) => {
    if (index >= 0 && index < loadedStructures.length) {
      setSelectedFileIndex(index);
    }
  };

  return (
    <div className="space-y-6">
      {/* Visualization Controls Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Visualization Controls</h3>
        <div>
          <h4 className="text-xs font-medium mb-2">View Mode</h4>
          <Select
            value={viewerState.viewMode}
            onValueChange={(value: ViewMode) => onViewModeChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select view mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cartoon">Cartoon</SelectItem>
              <SelectItem value="spacefill">Spacefill</SelectItem>
              <SelectItem value="licorice">Licorice</SelectItem>
              <SelectItem value="surface">Surface</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h4 className="text-xs font-medium mb-2">Color Scheme</h4>
          <Select
            value={viewerState.colorScheme}
            onValueChange={(value: ColorScheme) => onColorSchemeChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select color scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DEFAULT">Default</SelectItem>
              <SelectItem value="CHAIN">Chain</SelectItem>
              <SelectItem value="RESIDUE">Residue</SelectItem>
              <SelectItem value="ELEMENT">Element</SelectItem>
              <SelectItem value="BFACTOR">B-Factor</SelectItem>
              <SelectItem value="SEQUENCE">Sequence</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h4 className="text-xs font-medium mb-2">Atom Size</h4>
          <Slider
            value={[viewerState.atomSize]}
            onValueChange={([value]) => onAtomSizeChange(value)}
            min={0.1}
            max={3}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Show Ligands</label>
            <Button
              variant={viewerState.showLigand ? "default" : "outline"}
              size="sm"
              onClick={() => onLigandVisibilityChange(!viewerState.showLigand)}
            >
              {viewerState.showLigand ? "Visible" : "Hidden"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Show Water/Ions</label>
            <Button
              variant={viewerState.showWaterIon ? "default" : "outline"}
              size="sm"
              onClick={() => onWaterIonVisibilityChange(!viewerState.showWaterIon)}
            >
              {viewerState.showWaterIon ? "Visible" : "Hidden"}
            </Button>
          </div>
        </div>
      </div>

      {/* Structure Info Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Structure Info</h3>
        <p className="text-xs text-muted-foreground">
          Currently loaded structures and their sources
        </p>
        <Separator />
        
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {loadedStructures.length > 0 ? (
            loadedStructures.map((structure, index) => (
              <div 
                key={structure.id} 
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-sm ${
                  index === selectedMoleculeIndex ? 'bg-accent' : 'hover:bg-muted'
                }`}
                onClick={() => handleStructureSelect(index)}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{structure.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={structure.source === 'file' ? "outline" : "secondary"} className="text-xs">
                      {structure.source === 'file' ? 'File' : 'Job'}
                    </Badge>
                    {structure.molecule && (
                      <span className="text-xs text-muted-foreground">
                        {structure.molecule.atoms.length} atoms
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-sm text-muted-foreground">
              No structures loaded
            </div>
          )}
        </div>
      </div>

      {/* Uploaded Files Section */}
      {molecules.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Uploaded Files</h3>
          <div className="space-y-2">
            {molecules.map((mol, index) => (
              <div
                key={mol.file.name + index}
                className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                  selectedMoleculeIndex === index
                    ? 'bg-purple-100 dark:bg-purple-900'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <button
                  className="flex-1 text-left truncate"
                  onClick={() => onSelectMolecule(index)}
                >
                  {mol.file.name}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => handleDeleteFile(index, e)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
