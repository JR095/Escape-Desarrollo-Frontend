import { useState, useEffect } from "react";
import "../../index.css";
//import a from "../../assets/imgs/Place1.jpg";
import start from "../../assets/imgs/start.svg";
import location from "../../assets/imgs/location.svg";
import money from "../../assets/imgs/money.svg";
import guide from "../../assets/imgs/guide.svg";
import heart from "../../assets/imgs/heart.svg";
import fav from "../../assets/imgs/favorite.svg";

import back from "../../assets/imgs/back.svg";
import useFetchData from "../hooks/useFetchData";
import { useUser } from '../../context/UserContext.jsx';

import propTypes from "prop-types";

export function CardInformation({ id , onClose, favorite, hearts, setHearts }) {
  const { user } = useUser();


const url = `http://localhost/escape-desarrollo-backend/public/api/company/${id}/`+user.id;

const { data: placeData, loading, error } = useFetchData(url);

const [travelTime, setTravelTime] = useState(null);


console.log(placeData);

useEffect(() => {
  if (!placeData || !placeData[0] || !user) return;

  const place = placeData[0];
  
  if (place.longitude && place.latitude && user.longitude && user.latitude) {
    /*
    const origin = [user.longitude, user.latitude];
    const destination = [place.longitude, place.latitude];

    const routeUrl = `https://api.tomtom.com/routing/1/calculateRoute/${origin[1]},${origin[0]}:${destination[1]},${destination[0]}/json?key=dd8qO1N1bSR7yu4ShWlBi4HDup4MKSwi&traffic=false&travelMode=pedestrian`;

    fetch(routeUrl)
      .then(response => response.json())
      .then(data => {
        const travelTimeInSeconds = data.routes[0].summary.travelTimeInSeconds;
        const travelTimeInMinutes = Math.round(travelTimeInSeconds / 60);
        const travelTimeFormatted = convertirMinutosAHoras(travelTimeInMinutes);
        setTravelTime(travelTimeFormatted);
      })
      .catch(error => console.error('Error al calcular la ruta:', error));*/
    setTravelTime('Calculando...');
  } else {
    setTravelTime('Calculando...');
  }
}, [placeData, user]);


  function convertirMinutosAHoras(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return horas >= 1 ? `${horas}h ${mins}min` : `${mins}min`;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  if (!placeData || !placeData[0]) {
    return <p>No data found</p>;
  }

  const place = placeData[0];

 const close = () => {
  setHearts(false);
  onClose();
 }
 

  return (
    <div>
        <div className="relative">
        <img className="rounded-lg object-cover h-[50vh]  md:w-full" src={place.image} alt="" />
        <img onClick={favorite} className="absolute top-4 right-4 p-2 rounded-lg bg-white dark:bg-[#404040]" src={hearts == false ?  heart : fav} alt="" />
        <img onClick={close} className="absolute top-2 left-2 p-2 rounded-full" src={back} alt="" />
        </div>
      <div className="flex justify-between mt-4">
        <h3 className="text-black font-semibold text-3xl dark:text-white">{place.name}</h3>
        <div className="flex items-center gap-1">
          <img src={start} alt="start" />
          <p className="text-[#9A9797] font-semibold text-xl dark:text-[#BCBCBC]">
            2.5
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 my-3">
        <img src={location} alt="location" />
        <p className="text-[#9A9797] font-semibold text-xl dark:text-[#BCBCBC]">
          {place.canton_id}
        </p>
      </div>
      <div className="flex items-center justify-between bg-white dark:bg-[#404040] dark:border-gray-600 border border-gray-200 rounded-lg shadow  ">
      <div className="flex items-center gap-4 my-3 mx-8">
        <img src={money} alt="location" />
        <p className="text-black font-semibold text-xl md:text-2xl dark:text-[#BCBCBC] grid">
        ₡2500 
          <span className="text-[#9A9797] font-semibold text-base dark:text-[#BCBCBC]">
            /persona
          </span>
        </p>
      </div>
        <div className="flex items-center gap-4 my-3 mx-8">
          <img src={guide} alt="location" />
          <p className="text-black font-semibold text-xl md:text-2xl dark:text-[#BCBCBC]">
          {travelTime ? travelTime : 'Calculando...'}
          </p>
        </div>
      </div>
      <p className="mt-4 dark:text-white">{place.description}</p>
      <div className="flex align-bottom ">
      <button className="w-full bg-sky-500 text-white font-bold py-2 rounded-lg mt-4 text-lg">Ir</button>

      </div>
    </div>
  );
}

CardInformation.propTypes = {
  id: propTypes.number,
  onClose: propTypes.func,
  favorite: propTypes.func
};
