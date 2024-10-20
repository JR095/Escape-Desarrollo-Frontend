import propTypes from "prop-types";
import "../../index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, } from 'swiper/modules';
import { PostDropdown } from "../dropdown/PostDropdown";
import { useUser } from "../../context/UserContext.jsx";
import { useFetchComments } from "../hooks/useFetchComments.js";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function PostCard({
  id,
  media = [],
  name,
  city,
  info,
  category,
  likes,
  darkMode,
  setOpenComments,
  handleDeletePost
}) {
  const { user } = useUser();
  const { getCommentCount } = useFetchComments();
  const [commentCount, setCommentCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCommentCount = async () => {
      const count = await getCommentCount(id);
      setCommentCount(count);
    };

    fetchCommentCount();
  }, [id, getCommentCount]);

  return (
    <div className=" items-center py-4 justify-between lg:max-w-sm sm:w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-[#404040] dark:border-gray-700">
      <div className="flex items-center px-4 ">
        <img
          alt="Tania Andrew"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
          className=" inline-block h-8 w-8 rounded-full"
        />

        <div className="flex flex-col ml-3 text-sm">
          <span className="text-black font-semibold text-lg dark:text-white">
            {name}
          </span>
          <span className="text-[#9A9797] dark:text-[#BCBCBC]">
            {category} - {city}
          </span>
        </div>
        {user && user.user_type_id === 1 && (
          <div className="ml-auto">
            <PostDropdown postId={id} onDelete={() => { handleDeletePost(id) }} />
          </div>
        )}
      </div>
      <p className="px-4 dark:text-white">{info}</p>

      <div className="mt-2">
        {media.length > 0 && (
          <Swiper
            spaceBetween={5}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {media.map((item, index) => (
              <SwiperSlide key={index}>
                {item.type === 'image' ? (
                  <img src={item.url} alt={`Post Image ${index}`} className="w-full h-72 object-fill" />
                ) : (
                  <video className="w-full h-72 object-contain" controls>
                    <source src={item.url} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-4">
          <svg
            width="29"
            height="26"
            viewBox="0 0 29 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5928 0.0155411C6.12964 0.207237 4.9387 0.631296 3.86685 1.35161C2.19386 2.46113 0.997242 4.05861 0.40177 5.96396C-0.670078 9.39709 0.390428 12.9348 3.73074 17.0592C4.37158 17.855 6.50394 20.0566 7.42266 20.8699C9.0276 22.3047 10.7913 23.6756 12.6118 24.9188C14.2678 26.0457 14.4492 26.127 14.9369 25.8947C15.3056 25.7204 17.5117 24.1926 18.6402 23.3213C20.6875 21.747 22.145 20.4516 23.7272 18.7961C26.7443 15.6418 28.3776 12.8709 28.8937 10.0593C29.0354 9.2809 29.0354 7.78218 28.8937 7.03863C28.2188 3.51837 25.7065 0.904318 22.2584 0.143339C21.4928 -0.0251217 19.9049 -0.0367413 19.1336 0.120102C17.574 0.433788 16.213 1.12506 15.0107 2.21135L14.5116 2.65864L13.9899 2.18811C13.7006 1.93251 13.2866 1.6014 13.0711 1.45037C12.1638 0.828802 10.9445 0.31761 9.87827 0.125912C9.38488 0.0329685 7.97844 -0.0309315 7.5928 0.0155411ZM9.20908 1.90347C10.9785 2.15326 12.4246 3.00718 13.6156 4.49428C13.9728 4.94158 14.194 5.09261 14.5116 5.09261C14.8292 5.09261 15.056 4.94158 15.3963 4.5059C16.1052 3.59389 16.8425 2.98394 17.8122 2.5076C21.0902 0.89851 24.9862 2.31591 26.5628 5.68513C28.0373 8.83942 27.0052 12.319 23.3643 16.5015C21.4418 18.7089 18.1752 21.5089 15.0107 23.6524L14.5116 23.9893L13.7063 23.4316C8.44347 19.8184 4.39427 15.6999 2.77231 12.3248C1.58704 9.856 1.50197 7.69505 2.51711 5.58638C2.89708 4.79635 3.24302 4.32001 3.92923 3.65779C5.34135 2.29848 7.33192 1.63625 9.20908 1.90347Z"
              fill={darkMode ? "white" : "black"}
            />
          </svg>{" "}
          <svg
            width="30"
            height="26"
            viewBox="0 0 30 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={setOpenComments(id)}
            className="cursor-pointer"
          >
            <path
              d="M13.4488 0.0202389C10.0312 0.361166 7.19989 1.44751 4.81405 3.33127C1.46685 5.97201 -0.362093 9.97067 0.0599708 13.7266C0.382381 16.6216 1.92409 19.1699 4.51509 21.0826C4.81992 21.3079 5.09543 21.5102 5.13646 21.5333C5.24198 21.5911 5.07198 22.3307 4.83164 22.8854C4.48578 23.6886 4.28061 23.9602 3.2489 24.9946L2.25236 26L3.92303 25.9711C5.49405 25.948 5.62887 25.9364 6.19749 25.7978C7.5223 25.4568 8.56573 24.9079 9.65021 23.9776L10.0136 23.6655L10.9105 23.8447C12.6105 24.1798 13.1088 24.226 15.0901 24.226C17.0422 24.226 17.7222 24.1682 19.2053 23.8735C21.7142 23.3766 24.0238 22.3191 25.7942 20.8572C28.8307 18.3436 30.3782 14.5818 29.921 10.7912C29.6807 8.76298 28.8952 6.87344 27.6114 5.21504C27.2128 4.70076 26.1224 3.60864 25.5538 3.1637C23.5138 1.56308 20.9756 0.56341 17.816 0.13003C17.1712 0.0375748 14.0408 -0.0375443 13.4488 0.0202389ZM17.1301 1.80577C21.9663 2.30849 25.5773 4.51007 27.2831 7.98868C28.8893 11.2593 28.4555 15.0903 26.1459 18.0142C24.4107 20.2158 21.6849 21.7066 18.3729 22.2614C17.0949 22.4752 16.0339 22.5445 14.5391 22.5041C12.8157 22.4636 11.5202 22.2729 10.0078 21.8338L9.43917 21.672L8.9409 22.2094C8.66539 22.5041 8.26091 22.8739 8.04402 23.0415C7.66885 23.3188 6.39093 23.9949 6.33817 23.9371C6.32645 23.9255 6.39679 23.7175 6.49645 23.4806C6.75438 22.8623 6.91265 22.1458 6.96541 21.3426C6.99472 20.9554 7.0123 20.6434 7.00644 20.6376C7.00058 20.6319 6.72507 20.4527 6.38507 20.2389C5.48232 19.6669 4.90785 19.2046 4.21027 18.4938C3.00856 17.263 2.27581 15.934 1.91823 14.2987C1.73064 13.4493 1.73064 11.8371 1.92409 10.9646C2.80339 6.885 6.02163 3.64908 10.5119 2.32005C11.3326 2.07736 12.294 1.89822 13.566 1.75377C14.0877 1.69598 16.4091 1.73065 17.1301 1.80577Z"
              fill={darkMode ? "white" : "black"}
            />
          </svg>{" "}
        </div>
        <svg
          width="30"
          height="25"
          viewBox="0 0 30 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.0513 0.176934C27.9738 0.171329 22.1605 0.38261 15.127 0.651057C1.31043 1.18176 1.93209 1.14244 1.38398 1.53079C0.984663 1.8156 0.802323 2.07319 0.658314 2.56789C0.540075 2.97406 0.535994 3.04631 0.612189 3.46389C0.755676 4.29082 0.572629 4.08502 5.08602 8.35877L9.16627 12.2183L10.2391 17.733C11.4245 23.851 11.3468 23.5742 11.9715 24.1458C12.2793 24.4274 12.3425 24.4628 12.7488 24.5811C13.2436 24.7251 13.5589 24.7096 14.0136 24.5256C14.6356 24.2717 14.2687 24.775 22.1556 13.3843L29.4518 2.83843L29.5883 2.36977C29.6892 2.00375 29.7101 1.83474 29.6798 1.62822C29.5914 0.981113 29.1979 0.527658 28.5492 0.310567C28.3528 0.247741 28.1273 0.187747 28.0513 0.176934ZM18.2125 6.3167C13.7391 8.77645 10.0549 10.7768 10.034 10.7707C10.008 10.7631 8.6506 9.48681 7.01659 7.93791C5.37888 6.38228 3.65065 4.74945 3.17668 4.30081C2.70272 3.85216 2.28454 3.4254 2.24913 3.35296C2.14744 3.12 2.18401 2.95554 2.36558 2.85589C2.48813 2.78424 5.24736 2.66109 14.408 2.30579C20.9459 2.05123 26.3061 1.84362 26.3218 1.84817C26.3389 1.84751 22.6859 3.85695 18.2125 6.3167ZM20.3544 13.1085C15.1317 20.6655 13.5483 22.9215 13.422 22.9864C13.2405 23.0861 13.082 23.0287 12.94 22.8179C12.872 22.702 10.8272 12.3742 10.856 12.2753C10.8666 12.2389 27.0836 3.307 27.1201 3.31761C27.1253 3.31913 24.0798 7.72532 20.3544 13.1085Z"
            fill={darkMode ? "white" : "black"}
          />
        </svg>{" "}
      </div>
      <p className="mt-2 px-4 dark:text-white">{likes} {t('likes')}</p>

      {commentCount > 0 && (
        <p onClick={setOpenComments(id)} className="text-[#7F7B7B] px-4 dark:text-[#BCBCBC] cursor-pointer">
          {commentCount} {t("Comments")}
        </p>
      )}
    </div>
  );
}

PostCard.propTypes = {

  name: propTypes.string,
  city: propTypes.string,
  starts: propTypes.string,
  setIsOpen: propTypes.func,
  id: propTypes.number,
  category: propTypes.string,
  likes: propTypes.string,
  info: propTypes.string,
  darkMode: propTypes.bool,
};
