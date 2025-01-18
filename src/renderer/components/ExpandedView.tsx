import React from 'react';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { TimeStatsChart } from './TimeStatsChart';
import { TimeEntry } from '../data/timeData';

type StatBoxProps = {
  label: string;
  value: number;
  unit: string;
};

const StatBox: React.FC<StatBoxProps> = ({ label, value, unit }) => (
  <Box
    bg="white"
    p={4}
    borderRadius="md"
    shadow="sm"
    flex={1}
    textAlign="center"
  >
    <Text fontSize="lg" fontWeight="bold">
      {label}
    </Text>
    <Text fontSize="2xl">
      {value} {unit}
    </Text>
  </Box>
);

type ExpandedViewProps = {
  data: TimeEntry[];
  totalWork: number;
  totalLife: number;
  totalControl: number;
  onBack: () => void;
  viewType: 'hourly' | 'daily';
};

export const ExpandedView: React.FC<ExpandedViewProps> = ({
  data,
  totalWork,
  totalLife,
  totalControl,
  onBack,
  viewType,
}) => {
  const unit = viewType === 'hourly' ? 'min' : 'hours';
  
  return (
    <VStack spacing={4} w="100%" h="100%">
      <HStack w="100%" justify="space-between" align="center">
        <Box 
          cursor="pointer" 
          onClick={onBack}
          p={2}
          _hover={{ bg: 'gray.100' }}
          borderRadius="md"
          display="flex"
          alignItems="center"
        >
          <Text fontSize="lg">← Back</Text>
        </Box>
      </HStack>
      <HStack w="100%" spacing={4}>
        <StatBox label="Work" value={totalWork} unit={unit} />
        <StatBox label="Life" value={totalLife} unit={unit} />
        <StatBox label="Control" value={totalControl} unit={unit} />
      </HStack>
      <Box w="100%" flex={1}>
        <TimeStatsChart data={data} viewType={viewType} />
      </Box>
    </VStack>
  );
}; 