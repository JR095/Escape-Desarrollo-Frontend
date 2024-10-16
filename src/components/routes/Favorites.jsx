import "../../index.css";
//import { Sidebar } from "../navigation/Sidebar";
import { Navigation } from "../navigation/Navigation";
import { ContainerCards } from "../ui/home/ContainerCards.jsx";
import { useFetchMenubar } from "../hooks/useFetchMenubar.js";
import { CardInformation } from "../cards/CardInformation";
import { Filter } from "../navigation/Filter.jsx";
("use client");
import { Drawer } from "flowbite-react";
import { useState } from "react";
import propTypes from "prop-types";
import useFetchData from "../hooks/useFetchData.js";
import { CategorieNav } from "../navigation/CategorieNav.jsx";
import { useUser } from '../../context/UserContext.jsx';


export function Favorites() {
  const { user } = useUser();

  const { isMobile } = useFetchMenubar();
  const { data: categories, loading: loadingCategories } = useFetchData(
    "http://localhost/escape-desarrollo-backend/public/api/categories"
  );
  const [district, setDistrict] = useState([]);
  const { data: cantons, loading: loadingCantons } = useFetchData(
    "http://localhost/escape-desarrollo-backend/public/api/canton"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [idCategory, setIdCategory] = useState();
  const { data: subCategories, setData: setSubCategories } = useFetchData(
    `http://localhost/escape-desarrollo-backend/public/api/subcategories/${idCategory}`
  );

  const [idCategorySub, setIdCategorySub] = useState(0);
  const [idCanton, setIdCanton] = useState(0);
  const [idDistrict, setIdDistrict] = useState(0);
  
  const { data, loading } = useFetchData(
    `http://localhost/escape-desarrollo-backend/public/api/favorites/`+user.id
  );

  const handleClose = () => setIsOpen(false);
  const handleClosFilter = () => setIsFilter(false);

  const [id, setId] = useState(0);

  const openCard = (id) => () => {
    setIsOpen(true);
    console.log(id);
    setId(id);
  };

  const openFilter = (open) => {
    setIsFilter(open);
  };
  const fetchCategory = async (url, isCategory) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (isCategory == true) {
        setSubCategories(result);
      } else {
        setDistrict(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost/escape-desarrollo-backend/public/api/items/${idCategory}/${idCategorySub}/${idCanton}/${idDistrict}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Llamar la función asíncrona dentro del useEffect
  }, [idCategory, idCanton, idDistrict, idCategorySub]);*/

  const setsubcategories = (id) => () => {
    if (idCategory == id) {
      setIdCategory(0);
      fetchCategory(
        `http://localhost/escape-desarrollo-backend/public/api/subcategories/0`,
        true
      );
    } else {
      setIdCategory(id);
      fetchCategory(
        `http://localhost/escape-desarrollo-backend/public/api/subcategories/${id}`,
        true
      );
    }
  };

  const setdistrict = (id) => {
    setIdCanton(id);
    fetchCategory(
      `http://localhost/escape-desarrollo-backend/public/api/district/${id}`,
      false
    );
  };

  return (
    <div className=" dark:bg-[#2a2a2a]">
      <div className="flex-shrink-0 fixed top-0 left-0 z-10 h-full">
        <Navigation  />
      </div>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-full md:w-1/2 lg:w-1/3 dark:bg-[#2a2a2a]"
      >
        <Drawer.Items>
          <CardInformation id={id} onClose={handleClose} />
        </Drawer.Items>
      </Drawer>
      <div className="grid lg:justify-between ">
        <main
          className="flex flex-col lg:pl-12 px-5 md:w-[70vw] overflow-x-hidden transition-all duration-500 mb-4"
          style={{
            marginLeft: isMobile ? "0px" : "80px",
          }}
        >
          {isMobile ? (
            <CategorieNav setIsFilter={openFilter} />
          ) : (
            <h1 className="font-black dark:text-white text-3xl lg:text-4xl mt-6">
              ESCAPE
            </h1>
          )}
          <h2 className="font-bold md:text-2xl text-xl mb-8 dark:text-white mt-16 md:mt-10">
            Mis favoritos
          </h2>

          {!loading ? (
            <ContainerCards data={data} setIsOpen={openCard} />
          ) : (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">Cargando...</div>
            </div>
          )}
        </main>
        {!loadingCategories && !loadingCantons ? (
          isMobile ? (
            <Drawer
              open={isFilter}
              onClose={handleClosFilter}
              position="right"
              className="w-[85vw] md:w-1/2 lg:w-1/3 dark:bg-[#2a2a2a] p-0"
            >
              <Drawer.Items>
                <Filter
                  categories={categories}
                  setsubcategories={setsubcategories}
                  subcategories={subCategories}
                  canton={cantons}
                  district={district}
                  setdistrict={setdistrict}
                  idCanton={idCanton}
                  idDistrict={idDistrict}
                  idCategory={idCategory}
                  idCategorySub={idCategorySub}
                  setIdCategorySub={setIdCategorySub}
                  setIdDistrict={setIdDistrict}
                />
              </Drawer.Items>
            </Drawer>
          ) : (
            <Filter
              categories={categories}
              setsubcategories={setsubcategories}
              subcategories={subCategories}
              canton={cantons}
              district={district}
              setdistrict={setdistrict}
              idCanton={idCanton}
              idDistrict={idDistrict}
              idCategory={idCategory}
              idCategorySub={idCategorySub}
              setIdCategorySub={setIdCategorySub}
              setIdDistrict={setIdDistrict}
            />
          )
        ) : (
          <p value="">loading</p>
        )}
      </div>
    </div>
  );
}

Favorites.propTypes = {
  toggleDarkMode: propTypes.func,
  darkMode: propTypes.bool,
};
