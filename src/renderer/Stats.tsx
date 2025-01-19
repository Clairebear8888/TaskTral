import {
  Box,
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { hour: '8', focused: 40, distracted: 35, away: 25 },
  { hour: '9', focused: 42, distracted: 33, away: 25 },
  { hour: '10', focused: 52, distracted: 30, away: 18 },
  { hour: '11', focused: 58, distracted: 27, away: 15 },
  { hour: '12', focused: 55, distracted: 28, away: 17 },
  { hour: '13', focused: 53, distracted: 29, away: 18 },
  { hour: '14', focused: 50, distracted: 30, away: 20 },
  { hour: '15', focused: 48, distracted: 32, away: 20 },
  { hour: '16', focused: 45, distracted: 35, away: 20 },
  { hour: '17', focused: 42, distracted: 38, away: 20 },
  { hour: '18', focused: 40, distracted: 35, away: 25 },
  { hour: '19', focused: 38, distracted: 37, away: 25 },
  { hour: '20', focused: 35, distracted: 40, away: 25 },
];

interface StatsProps {
  onCancel: () => void;
}

export function Stats({ onCancel }: StatsProps) {
  const [granularity, setGranularity] = useState<string>('normal');

  const handleSliderChange = (value: number) => {
    if (value <= 33) setGranularity('chilled');
    else if (value <= 66) setGranularity('normal');
    else setGranularity('nuclear');
  };

  return (
    <Box p={4} position="relative">
      {/* Navigation */}
      <HStack justify="space-between" mb={8}>
        <Text color="gray.400">{'< Previous'}</Text>
        <Text
          color="gray.400"
          sx={{
            '-webkit-app-region': 'drag',
            cursor: 'move', // Visual indicator that it's draggable
          }}
        >
          Yesterday
        </Text>
        <Text>Next &gt;</Text>
      </HStack>

      {/* Main content */}
      <HStack align="flex-start" spacing={8}>
        {/* Left side - Stats */}
        <VStack align="flex-start" flex={1}>
          <Heading size="xl" mb={4}>
            Stats
          </Heading>
          <Box w="full" h="400px">
            <BarChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="hour"
                label={{ value: "O'clock", position: 'bottom', dy: 20 }}
              />
              <YAxis
                label={{ value: 'Percent', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="focused"
                stackId="a"
                fill="#4CAF50"
                name="Focused"
              />
              <Bar
                dataKey="distracted"
                stackId="a"
                fill="#FFC107"
                name="Distracted"
              />
              <Bar dataKey="away" stackId="a" fill="#FF9800" name="Away" />
            </BarChart>
          </Box>
        </VStack>

        {/* Right side - Summary */}
        <VStack align="flex-start" flex={1}>
          <Heading size="xl" mb={4}>
            Summary
          </Heading>

          {/* Granularity Slider */}
          <Box w="full" pt={6} pb={8} px={8}>
            <Slider
              defaultValue={50}
              min={0}
              max={100}
              step={50}
              onChange={handleSliderChange}
            >
              <SliderMark value={0} mt={4} ml={-2} fontSize="sm">
                Chilled
              </SliderMark>
              <SliderMark value={50} mt={4} ml={-4} fontSize="sm">
                Normal
              </SliderMark>
              <SliderMark value={100} mt={4} ml={-12} fontSize="sm">
                NUCLEAR
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <List spacing={2}>
            <ListItem>• Chronological Log</ListItem>
            <ListItem>• 12:03 - 12:04 Hacker news (1h)</ListItem>
            <ListItem>• 12:03 - 12:04 Hacker news (1h)</ListItem>
            <ListItem>• 12:03 - 12:04 Hacker news (1h)</ListItem>
          </List>

          <Text mt={8} fontSize="2xl">
            Granularity "{granularity}"
          </Text>
        </VStack>
      </HStack>

      {/* Back button (formerly Cancel) */}
      <Button
        position="absolute"
        bottom={4}
        left={4}
        size="sm"
        variant="ghost"
        onClick={onCancel}
      >
        Back
      </Button>
    </Box>
  );
}
