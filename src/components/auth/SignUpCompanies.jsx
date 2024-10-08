import "../../index.css";
import { AuthInput } from "../inputs/AuthInput";
import { NavLink, useNavigate } from "react-router-dom";
import { Selected } from "../selected/Selected";
import { AuthCarousel } from "./AuthCaruosel";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export function SignUpCompanies() {
    const { t } = useTranslation();

    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const handleTooltipToggle = () => {
        setTooltipVisible(!isTooltipVisible);
    };

    const [name, setName] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSub_categories, setSelectedSub_categories] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCanton, setSelectedCanton] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrormessage] = useState('');
    const [districts, setDistricts] = useState([]);

    const canton_id = [
        { id: "1", name: "Puntarenas" },
        { id: "2", name: "Esparza" },
        { id: "3", name: "Buenos Aires" },
        { id: "4", name: "Montes de Oro" },
        { id: "5", name: "Aguirre" },
        { id: "6", name: "Golfito" },
        { id: "7", name: "Coto Brus" },
        { id: "8", name: "Parrita" },
        { id: "9", name: "Corredores" },
        { id: "10", name: "Garabito" },
    ];

    const district_id = [
        { id: "1", name: "Puntarenas" },
        { id: "2", name: "Pitahaya" },
        { id: "3", name: "Chomes" },
        { id: "4", name: "Lepanto" },
        { id: "5", name: "Paquera" },
        { id: "6", name: "Manzanillo" },
        { id: "7", name: "Guacimal" },
        { id: "8", name: "Barranca" },
        { id: "9", name: "Monteverde" },
        { id: "10", name: "Isla del Coco" },
        { id: "11", name: "Cóbano" },
        { id: "12", name: "Chacarita" },
        { id: "13", name: "Chira" },
        { id: "14", name: "Acapulco" },
        { id: "15", name: "El Roble" },
        { id: "16", name: "Esparza centro" },
        { id: "17", name: "Espíritu Santo" },
        { id: "18", name: "San Juan" },
        { id: "19", name: "San Rafael" },
        { id: "20", name: "San Jerónimo" },
    ];

    const sub_categories_id = [
        { id: "1", name: "Restaurantes" },
        { id: "2", name: "Sodas" },
        { id: "3", name: "Comida Callejera" },
        { id: "4", name: "Cafeterías" },
        { id: "5", name: "Heladerías" },
        { id: "6", name: "Tiendas de Ropa" },
        { id: "7", name: "Artesanías" },
        { id: "8", name: "Mercados" },
        { id: "9", name: "Ferias" },
        { id: "10", name: "Caminatas" },
        { id: "11", name: "Deportes de Aventura" },
        { id: "12", name: "Parques y Jardines" },
        { id: "13", name: "Excursiones Naturales" },
        { id: "14", name: "Museos" },
        { id: "15", name: "Teatros" },
        { id: "16", name: "Exposiciones de Arte" },
        { id: "17", name: "Cine" },
        { id: "18", name: "Conciertos" },
        { id: "19", name: "Festivales" },
        { id: "20", name: "Piscinas" },
        { id: "21", name: "Discotecas" },
        { id: "22", name: "Spas" },
    ];

    const category_id = [
        { id: "1", name: "Comida y Bebida" },
        { id: "2", name: "Compras" },
        { id: "3", name: "Actividades al Aire Libre" },
        { id: "4", name: "Entretenimiento" },
        { id: "5", name: "Cultura" },
        { id: "6", name: "Bienestar y Relajación" },
    ];

    useEffect(() => {
        if (selectedCanton) {
            
            fetch(`http://localhost/escape-desarrollo-backend/public/api/cantons/${selectedCanton}/districts`)
                .then((response) => response.json())
                .then((data) => {
                    setDistricts(data); 
                })
                .catch((error) => {
                    console.error("Error al obtener los distritos:", error);
                });
        }
    }, [selectedCanton]);

    const validateFields = () => {
        if (!name || !email || !password || !password_confirmation) {
            setErrormessage('Por favor, completa todos los campos solicitados.');
            return false;
        }
        if (password !== password_confirmation) {
            setErrormessage('Las contraseñas no coinciden.');
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Nombre:", name);
        console.log("Phone number:", phone_number);
        console.log("Category:", category_id);
        console.log("Sub_categories:", sub_categories_id)
        console.log("Email:", email);
        console.log("Description:", description);
        console.log("Canton:", selectedCanton);
        console.log("Distrito:", selectedDistrict);
        console.log("Address", address);
        console.log("Contraseña:", password);
        console.log("Confirmar Contraseña:", password_confirmation);

        if (!validateFields()) {
            setShowError(true);
            setShowSuccess(false);
            return;
        }

        setShowError(false);

        if (document.getElementById('share-location').checked) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log(latitude, longitude);

                const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/company-register', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        phone_number,
                        category_id: selectedCategory,
                        sub_categories_id: selectedSub_categories,
                        email,
                        description,
                        //image
                        latitude: latitude,
                        longitude: longitude,
                        canton_id: selectedCanton,
                        district_id: selectedDistrict,
                        address,
                        //followers_count,
                        password,
                        password_confirmation,
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setShowSuccess(true);
                setShowError(false);
                setTimeout(() => {
                    navigate('/signInCompanies');
                }, 2500);

            } catch (error) {
                console.error("Error al obtener la ubicación o al enviar los datos:", error);
                setShowError(true);
                setShowSuccess(false);
            }
        } else {
            try {
                const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/company-register', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        phone_number,
                        category_id: selectedCategory,
                        sub_categories_id: selectedSub_categories,
                        email,
                        description,
                        //image
                        latitude: latitude,
                        longitude: longitude,
                        canton_id: selectedCanton,
                        district_id: selectedDistrict,
                        address,
                        //followers_count,
                        password,
                        password_confirmation,
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setShowSuccess(true);
                setShowError(false);
                setTimeout(() => {
                    navigate('/signInCompanies');
                }, 2500);
                //navigate('/signIn');

            } catch (error) {
                console.error("Error al enviar los datos sin ubicación:", error);
                setShowError(true);
                setShowSuccess(false);
            }
        }
    };

    return (
        <div className="grid justify-center items-center h-[100vh] md:grid-cols-2 gap-4">

            <div className="flex justify-center items-center">

                <form className="ww-full lg:w-2/4" onSubmit={handleSubmit}>
                    <img className="w-[15rem] mx-auto mt-8 mb-16 " src="../src/assets/imgs/logo-celeste.png" alt="Logo" />
                    <div className="grid lg:grid-cols-2 gap-4">
                        <div>
                            <AuthInput label={t('iCompanyName')} name="name" placeholder={t('iCompanyName')} type="text" onChange={e => setName(e.target.value)} />
                            <AuthInput label={t('iPhone')} name="phone_number" placeholder={t('iPhone')} type="text" onChange={e => setPhone_number(e.target.value)} />
                            <AuthInput label={t('iEmail')} name="email" placeholder={t('iEmail')} type="email" onChange={e => setEmail(e.target.value)} />
                            <AuthInput label={t('Description')} name="description" placeholder={t('Description')} type="text" onChange={e => setDescription(e.target.value)} />
                            <AuthInput label={t('iPassword')} name="password" placeholder={t('iPassword')} type="password" onChange={e => setPassword(e.target.value)} />
                            <AuthInput label={t('iConfirmPassword')} name="passwordConfirm" placeholder={t('iConfirmPassword')} type="password" onChange={e => setPassword_confirmation(e.target.value)} />
                        </div>
                        <div>
                            <Selected
                                label={t('Category')}
                                options={category_id}
                                placeholder={t('Category')}
                                onChange={e => setSelectedCategory(e.target.value)}
                            />

                            <Selected
                                label={t('Subcategories')}
                                options={sub_categories_id}
                                placeholder={t('Subcategories')}
                                onChange={e => setSelectedSub_categories(e.target.value)}
                            />

                            <Selected
                                label={t('Canton')}
                                options={canton_id}
                                placeholder={t('Canton')}
                                onChange={e => setSelectedCanton(e.target.value)}
                            />

                            <Selected
                                label={t('District')}
                                options={districts.map(district => ({ id: district.id, name: district.name }))} // Muestra los distritos dinámicos
                                placeholder={t('District')}
                                onChange={e => setSelectedDistrict(e.target.value)}
                            />

                            <AuthInput label={t('Address')} name="address" placeholder={t('Address')} type="text" onChange={e => setAddress(e.target.value)} />

                            <div className="flex items-center relative lg:mt-[3rem] mt-[1rem]">
                                <input className="shadow-md p-3 rounded-lg border-none" type="checkbox" id="share-location" name="shareLocation" />
                                <label htmlFor="share-location" className="ml-4 text-sky-500 font-medium">{t('ShareLocation')}</label>
                                <div className="ml-2 relative">
                                    <svg onClick={handleTooltipToggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-gray-400 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>

                                    {/* Tooltip */}
                                    {isTooltipVisible && (
                                        <div className="absolute left-0 top-10 z-10 w-48 bg-white shadow-lg p-3 rounded-lg text-sm text-gray-700">
                                            <p>{t('ShareLocationInfo')}</p>
                                            <button
                                                className="text-sky-500 mt-2"
                                                onClick={handleTooltipToggle}
                                            >
                                                {t('GotIt')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <input
                        className="text-white p-3 bg-sky-500 flex rounded-xl items-center justify-center w-full lg:my-8 my-10 font-bold text-lg cursor-pointer transition delay-150 duration-300 ease-in-out hover:bg-blue-800 hover:text-white"
                        type="submit"
                        name="btn-signup"
                        value={t('signup')}
                    />

                    <p className="text-gray-400 text-center">{t('goSignIn')}
                        <NavLink className="text-sky-500 ml-2 font-medium" to="/signInCompanies">{t('iSignIn')}</NavLink>
                    </p>
                </form>


            </div>

            <AuthCarousel />

            {showSuccess && (
                <Alert severity="success" className="absolute top-4 right-4">
                    <AlertTitle>Éxito</AlertTitle>
                    ¡Inicio de sesión correctamente! Serás redirigido en breve.
                </Alert>
            )}

            {showError && (
                <Alert severity="error" className="absolute top-4 right-4">
                    <AlertTitle>Error</AlertTitle>
                    ¡Error! Credenciales inválidas, por favor introduce las correctas.
                </Alert>
            )}

        </div>
    );
}