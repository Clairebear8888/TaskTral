import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider, HStack, Switch, Text } from '@chakra-ui/react';
import { CompactView } from './components/CompactView';
import { ExpandedView } from './components/ExpandedView';
import { hourlyData, dailyData } from './data/timeData';

declare global {
  interface Window {
    electron: {
      resizeWindow: (width: number, height: number) => void;
    };
  }
}

export default function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [viewMode, setViewMode] = useState<'hours' | 'days'>('hours');

  const currentData = viewMode === 'hours' ? hourlyData : dailyData;
  
  const totalWork = currentData.reduce((sum, entry) => sum + entry.work, 0);
  const totalLife = currentData.reduce((sum, entry) => sum + entry.life, 0);
  const totalControl = Math.floor((totalWork / (totalWork + totalLife)) * 100);

  useEffect(() => {
    const width = 400;
    const height = showDetailView 
      ? 600
      : (isExpanded ? 400 : 200);
    
    try {
      window.electron.resizeWindow(width, height);
    } catch (error) {
      console.error('Failed to resize window:', error);
    }
  }, [isExpanded, showDetailView, viewMode]);

  if (!showDetailView) {
    return (
      <ChakraProvider>
        <Box p={4}>
          <CompactView
            isExpanded={isExpanded}
            onExpand={() => setIsExpanded(!isExpanded)}
            onSwitchView={() => setShowDetailView(true)}
          />
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Box p={4}>
        <HStack mb={4} justify="center">
          <Text>Hours</Text>
          <Switch
            isChecked={viewMode === 'days'}
            onChange={() => setViewMode(viewMode === 'hours' ? 'days' : 'hours')}
          />
          <Text>Days</Text>
        </HStack>
        <ExpandedView
          data={currentData}
          totalWork={totalWork}
          totalLife={totalLife}
          totalControl={totalControl}
          onBack={() => setShowDetailView(false)}
          viewType={viewMode === 'hours' ? 'hourly' : 'daily'}
        />
      </Box>
    </ChakraProvider>
  );
}
