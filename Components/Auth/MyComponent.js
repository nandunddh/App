import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { DB_URL } from '../Constants/Constants';

const MyComponent = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${DB_URL}SERVER(backend)/test.php`);
        const result = await response.json();

        if (result && result[0] && result[0].Message === 'Connected successfully') {
          setMessage('Connect successful');
        } else {
          setError('Error: Connection not successful');
        }
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {message ? (
        <Text>{message}</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default MyComponent;
