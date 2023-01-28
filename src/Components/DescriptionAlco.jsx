import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const DescriptionAlco = () => {
  const { id } = useParams();
  const [alco, setAlco] = React.useState();

  React.useEffect(() => {
    async function getAlco() {
      try {
        const { data } = await axios.get(`https://62dd5df1ccdf9f7ec2c5f699.mockapi.io/pizzas` + id);
        setAlco(data);
      } catch (error) {
        alert('Виниикла помилка');
      }
    }
    getAlco();
  }, []);

  return (
    <div>
      <h2>{alco}</h2>
    </div>
  );
};

export default DescriptionAlco;
