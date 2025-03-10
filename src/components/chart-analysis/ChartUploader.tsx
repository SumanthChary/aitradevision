
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ImageUploader from '@/components/ImageUploader';
import { Button } from '@/components/ui/button';

interface ChartUploaderProps {
  image: string | null;
  setImage: (image: string | null) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const ChartUploader: React.FC<ChartUploaderProps> = ({ 
  image, 
  setImage, 
  onAnalyze, 
  isAnalyzing 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <ImageUploader 
          image={image} 
          setImage={setImage} 
        />
        
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={onAnalyze} 
            disabled={!image || isAnalyzing}
            className="w-full sm:w-auto hover-scale"
          >
            {isAnalyzing ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Analyzing...
              </>
            ) : (
              'Analyze Chart'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartUploader;
