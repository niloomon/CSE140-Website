/**
 * iframe-skeleton.tsx - Loading Skeleton Component for Iframes
 * 
 * Displays an animated skeleton loader while Google Docs iframes are loading.
 * Provides visual feedback to users instead of a blank screen.
 */

import React from 'react';
import { Card } from './card';

interface IframeSkeletonProps {
  height?: string;
  className?: string;
  text?: string; // Custom loading text
}

/**
 * IframeSkeleton Component
 * 
 * Shows a simple loading indicator with icon and text
 * while the iframe content is loading.
 */
export const IframeSkeleton: React.FC<IframeSkeletonProps> = ({ 
  height = '1200px',
  className = '',
  text = 'Loading calendar...' // Default text
}) => {
  return (
    <div 
      className={`w-full ${className}`}
      style={{ height }}
    >
      <Card className="w-full h-full p-8 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
        {/* Loading indicator */}
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg font-medium">{text}</span>
        </div>
      </Card>
    </div>
  );
};

