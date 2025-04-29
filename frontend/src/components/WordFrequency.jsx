import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const WordFrequency = ({ wordFrequency }) => {
  // Sort and get top 3 words
  const top3Words = wordFrequency
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map(item => ({
      word: item.word,
      count: item.count
    }));

  return (
    <Box>
      {/* Bar Chart */}
      <Box sx={{ width: '100%', height: 200, mb: 3 }}>
        <ResponsiveContainer>
          <BarChart 
            data={top3Words}
            layout="vertical"
            margin={{ top: 5, right: 5, bottom: 5, left: 40 }}
          >
            <XAxis type="number" />
            <YAxis 
              type="category" 
              dataKey="word" 
              tick={{ fill: '#666', fontSize: 12 }}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px'
              }}
              formatter={(value, name) => [`Count: ${value}`, 'Frequency']}
            />
            <Bar 
              dataKey="count" 
              fill="#1976d2"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Word Chips */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {top3Words.map((item, index) => (
          <Chip
            key={item.word}
            label={`${item.word} (${item.count})`}
            color={index === 0 ? 'primary' : index === 1 ? 'secondary' : 'default'}
            variant={index === 0 ? 'filled' : 'outlined'}
            sx={{ 
              width: 'fit-content',
              fontWeight: index === 0 ? 600 : 400
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default WordFrequency; 