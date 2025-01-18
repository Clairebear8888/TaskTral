import React from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';

type TimeEntry = {
  Task: string;
  Seconds: number;
};

type CompactViewProps = {
  onExpand: () => void;
  onSwitchView: () => void;
  isExpanded: boolean;
  entries?: TimeEntry[];
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes === 0) {
    return `${seconds} Secs`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')} Mins`;
};

export function CompactView({
  onExpand,
  onSwitchView,
  isExpanded,
  entries = [
    { Task: "Emails", Seconds: 900 },
    { Task: "Code Review", Seconds: 1200 },
    { Task: "Meeting", Seconds: 1800 },
    { Task: "Documentation", Seconds: 600 },
    { Task: "Bug Fixing", Seconds: 1500 },
    { Task: "Planning", Seconds: 750 },
    { Task: "Development", Seconds: 2400 },
    { Task: "Testing", Seconds: 1100 },
    { Task: "Deployment", Seconds: 450 },
    { Task: "Team Sync", Seconds: 600 }
  ],
}: CompactViewProps): React.ReactElement {
  return (
    <VStack 
      spacing={4} 
      align="stretch"
      h={isExpanded ? '400px' : '200px'}
      transition="height 0.3s"
    >
      <Box
        w="200px"
        h={isExpanded ? '400px' : '200px'}
        bg="rgb(83, 121, 70)"
        borderRadius="md"
        position="relative"
        cursor="pointer"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (!target.closest('button')) {
            onSwitchView();
          }
        }}
      >
        <VStack h="100%" justify="center" align="center">
          <Text color="white" fontSize="2xl" fontWeight="bold">
            Work
          </Text>
        </VStack>
        <Button
          position="absolute"
          bottom="4"
          left="50%"
          transform="translateX(-50%)"
          size="sm"
          onClick={onExpand}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </Box>

      {isExpanded && (
        <Box
          w="200px"
          maxH="500px"
          overflowY="auto"
          borderRadius="md"
          bg="white"
          boxShadow="sm"
          p={2}
        >
          <VStack spacing={2} align="stretch">
            {entries.map((entry, index) => (
              <Box
                key={index}
                p={2}
                borderRadius="md"
                bg="gray.50"
                fontSize="sm"
              >
                <Text fontWeight="medium">{entry.Task}</Text>
                <Text color="gray.600">{formatTime(entry.Seconds)}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );
}
