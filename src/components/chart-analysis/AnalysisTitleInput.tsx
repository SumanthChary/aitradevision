
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AnalysisTitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

const AnalysisTitleInput: React.FC<AnalysisTitleInputProps> = ({ 
  title, 
  onTitleChange, 
  onSave, 
  isSaving 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">
            Analysis Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter a title for this analysis"
            className="w-full p-2 rounded-md border border-input bg-background"
          />
          <div className="flex justify-end">
            <Button
              onClick={onSave}
              disabled={isSaving}
              className="mt-2 hover-scale"
            >
              {isSaving ? "Saving..." : "Save Analysis"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisTitleInput;
