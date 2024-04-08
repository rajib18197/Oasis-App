// This file is only for experiment purposes.

import { useState } from "react";
export default function Slider({
  children,
  initialCurSlide,
  initialSelectedContent,
  contents,
  maxSlide,
  slidesClassName,
  containerClassName,
  render,
}) {
  const [{ selectedContent, curSlide }, setSliderState] = useState({
    curSlide: initialCurSlide || 0,
    selectedContent: initialSelectedContent || null,
    maxSlide: maxSlide || 0,
  });

  function handleClick(img, i) {
    setSliderState((prev) => ({ ...prev, selectedContent: img, curSlide: i }));
  }

  function handleNextSlide() {
    setSliderState((prev) => ({
      ...prev,
      selectedContent:
        prev.curSlide === prev.maxSlide - 1
          ? contents[0]
          : contents[prev.curSlide + 1],
      curSlide: prev.curSlide === prev.maxSlide - 1 ? 0 : prev.curSlide + 1,
    }));
  }

  function handlePrevSlide() {
    setSliderState((prev) => ({
      ...prev,
      selectedContent:
        prev.curSlide === 0
          ? contents[contents.length - 1]
          : contents[prev.curSlide - 1],
      curSlide: prev.curSlide === 0 ? contents.length - 1 : prev.curSlide - 1,
    }));
  }

  return (
    <>
      <div className={slidesClassName}>
        {contents.map((content, i) =>
          children({
            content,
            style: {
              transform: `translateX(${(i - curSlide) * 100}%)`,
            },
          })
        )}
      </div>

      <button
        className="absolute top-[50%] left-[0%] -translate-x-[0%] -translate-y-[50%] w-[40px] h-[40px] bg-pink-400 rounded-full text-xl z-20"
        onClick={handlePrevSlide}
      >
        &larr;
      </button>

      <button
        className="absolute top-[50%] right-[0%] -translate-x-[0%] -translate-y-[50%] w-[40px] h-[40px] bg-pink-400 rounded-full text-xl z-20"
        onClick={handleNextSlide}
      >
        &rarr;
      </button>

      <div className={containerClassName}>
        {contents.map((content, i) =>
          render({
            content,
            selectedContent,
            onClick: () => handleClick(content, i),
          })
        )}
      </div>
    </>
  );
}

// export default function ProductImages({ thumbnail, images, title }) {
//   const index = images.findIndex((img) => img === thumbnail);
//   console.log(index);
//   console.log(images);
//   console.log(thumbnail);

//   const initialState = {
//     curSlide: index > 0 ? index : 0,
//     selectedContent: images[index > 0 ? index : 0],
//     maxSlide: images.length,
//     contents: images,
//     hasActivateBottom: false,
//   };

//   return (
//     <div className="relative w-full lg:w-7/12 border border-slate-500/20 p-4">
//       <Slider initialState={initialState}>
//         <Slider.Slide className="relative w-[100%] h-[500px] overflow-hidden">
//           {({ content, style }) => (
//             <img
//               src={content}
//               key={content}
//               style={style}
//               className={`absolute z-10 top-0 w-[100%] h-[100%] mx-auto object-cover transition-all duration-300`}
//               alt=""
//             />
//           )}
//         </Slider.Slide>
//         <Slider.PrevSlideButton>&larr;</Slider.PrevSlideButton>
//         <Slider.NextSlideButton>&rarr;</Slider.NextSlideButton>

//         {/* <Slider.Contents className="flex gap-4 mt-4">
//           {({ selectedContent, content, onClick }) => ( */}
//         {/* <Slider initialState={{ ...initialState, hasActivateBottom: false }}> */}
//         <div className="relative">
//           <Slider.Slide
//             className={"relative w-[100%] h-[105px] overflow-hidden "}
//           >
//             {({ selectedContent, onClick, content, style }) => (
//               <img
//                 src={content}
//                 key={content}
//                 onClick={onClick}
//                 style={style}
//                 className={`absolute z-10 top-0 w-[200px] h-[100px] mx-auto object-cover transition-all duration-300 ${
//                   selectedContent === content ||
//                   (!selectedContent && content === thumbnail)
//                     ? "border-4 border-red-400"
//                     : "border"
//                 }`}
//                 alt=""
//               />
//             )}
//           </Slider.Slide>
//           <Slider.PrevSlideButton>&larr;</Slider.PrevSlideButton>
//           <Slider.NextSlideButton>&rarr;</Slider.NextSlideButton>
//         </div>
//         {/* </Slider> */}
//       </Slider>
//       {/* )} */}
//       {/* </Slider.Contents> */}
//     </div>
//   );
// }

// export default function ProductImages({ thumbnail, images, title }) {
//   const index = images.findIndex((img) => img === thumbnail);

//   return (
//     <div className="relative w-full lg:w-7/12 border border-slate-500/20 p-4">
//       <Slider
//         initialCurSlide={index}
//         initialSelectedContent={images[index]}
//         maxSlide={images.length}
//         contents={images}
//         slidesClassName="relative w-[100%] h-[500px] overflow-hidden"
//         containerClassName="flex gap-4 mt-4"
//         render={({ selectedContent, content, onClick }) => (
//           <img
//             src={content}
//             key={content}
//             onClick={onClick}
//             className={`w-[100px] h-[100px] mx-auto object-cover ${
//               selectedContent === content ||
//               (!selectedContent && content === thumbnail)
//                 ? "border-4 border-red-400"
//                 : "border"
//             }`}
//             alt=""
//           />
//         )}
//       >
//         {({ content, style }) => (
//           <img
//             src={content}
//             key={content}
//             style={style}
//             className={`absolute z-10 top-0 w-[100%] h-[100%] mx-auto object-cover transition-all duration-300`}
//             alt=""
//           />
//         )}
//       </Slider>
//     </div>
//   );
// }

// export default function ProductImages({ thumbnail, images, title }) {
//     const index = images.findIndex((img) => img === thumbnail);

//     const [{ selectedImage, curSlide }, setSliderState] = useState({
//       curSlide: index,
//       selectedImage: images[index],
//       maxSlide: images.length,
//     });

//     function handleClick(img, i) {
//       setSliderState((prev) => ({ ...prev, selectedImage: img, curSlide: i }));
//     }

//     function handleNextSlide() {
//       setSliderState((prev) => ({
//         ...prev,
//         selectedImage:
//           prev.curSlide === prev.maxSlide - 1
//             ? images[0]
//             : images[prev.curSlide + 1],
//         curSlide: prev.curSlide === prev.maxSlide - 1 ? 0 : prev.curSlide + 1,
//       }));
//     }

//     function handlePrevSlide() {
//       setSliderState((prev) => ({
//         ...prev,
//         selectedImage:
//           prev.curSlide === 0
//             ? images[images.length - 1]
//             : images[prev.curSlide - 1],
//         curSlide: prev.curSlide === 0 ? images.length - 1 : prev.curSlide - 1,
//       }));
//     }

//     return (
//       <div className="relative w-full lg:w-7/12 border border-slate-500/20 p-4">
//         <div className="relative w-[100%] h-[500px] overflow-hidden">
//           {images.map((img, i) => (
//             <img
//               src={img}
//               key={img}
//               style={{
//                 transform: `translateX(${(i - curSlide) * 100}%)`,
//               }}
//               className={`absolute z-10 top-0 w-[100%] h-[100%] mx-auto object-cover transition-all duration-300`}
//               alt=""
//             />
//           ))}
//           <button
//             className="absolute top-[50%] left-[0%] -translate-x-[0%] -translate-y-[50%] w-[40px] h-[40px] bg-pink-400 rounded-full text-xl z-20"
//             onClick={handlePrevSlide}
//           >
//             &larr;
//           </button>
//           <button
//             className="absolute top-[50%] right-[0%] -translate-x-[0%] -translate-y-[50%] w-[40px] h-[40px] bg-pink-400 rounded-full text-xl z-20"
//             onClick={handleNextSlide}
//           >
//             &rarr;
//           </button>
//         </div>

//         <div className="flex gap-4 mt-4">
//           {images.map((img, i) => (
//             <img
//               src={img}
//               key={img}
//               onClick={() => handleClick(img, i)}
//               className={`w-[100px] h-[100px] mx-auto object-cover ${
//                 selectedImage === img || (!selectedImage && img === thumbnail)
//                   ? "border-4 border-red-400"
//                   : "border"
//               }`}
//               alt=""
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

// 2nd version

// import { createContext, useContext, useState } from "react";

// const SliderContext = createContext();

// export function useSlider() {
//   const context = useContext(SliderContext);
//   return context;
// }

// export default function Slider({ children, initialState }) {
//   const [
//     { selectedContent, curSlide, contents, maxSlide, hasActivateBottom },
//     setSliderState,
//   ] = useState({
//     curSlide: initialState.curSlide || 0,
//     selectedContent: initialState.selectedContent || null,
//     maxSlide: initialState.maxSlide,
//     contents: initialState.contents,
//     hasActivateBottom: initialState.hasActivateBottom,
//   });

//   function handleClick(img, i) {
//     setSliderState((prev) => ({ ...prev, selectedContent: img, curSlide: i }));
//   }

//   function handleNextSlide() {
//     setSliderState((prev) => ({
//       ...prev,
//       selectedContent:
//         prev.curSlide === prev.maxSlide - 1
//           ? prev.contents[0]
//           : prev.contents[prev.curSlide + 1],
//       curSlide: prev.curSlide === prev.maxSlide - 1 ? 0 : prev.curSlide + 1,
//     }));
//   }

//   function handlePrevSlide() {
//     setSliderState((prev) => ({
//       ...prev,
//       selectedContent:
//         prev.curSlide === 0
//           ? prev.contents[prev.contents.length - 1]
//           : prev.contents[prev.curSlide - 1],
//       curSlide:
//         prev.curSlide === 0 ? prev.contents.length - 1 : prev.curSlide - 1,
//     }));
//   }

//   return (
//     <SliderContext.Provider
//       value={{
//         selectedContent,
//         curSlide,
//         maxSlide,
//         contents,
//         hasActivateBottom,
//         onContentClick: handleClick,
//         onNextSlide: handleNextSlide,
//         onPrevSlide: handlePrevSlide,
//       }}
//     >
//       {children}
//     </SliderContext.Provider>
//   );
// }

// function Slide({ children, className }) {
//   const {
//     selectedContent,
//     contents,
//     curSlide,
//     onContentClick,
//     hasActivateBottom,
//   } = useSlider();

//   return (
//     <div className={className}>
//       {contents.map((content, i) =>
//         children({
//           content,
//           selectedContent: !hasActivateBottom ? selectedContent : null,
//           onClick: !hasActivateBottom ? () => onContentClick(content, i) : null,
//           style: {
//             transform: `translateX(${(i - curSlide) * 100}%)`,
//           },
//         })
//       )}
//     </div>
//   );
// }

// function PrevSlideButton({ children }) {
//   const { onPrevSlide } = useSlider();

//   return (
//     <button
//       className="absolute top-[50%] left-[0%] -translate-x-[0%] -translate-y-[50%] w-[40px] h-[40px] bg-pink-400 rounded-full text-xl z-20"
//       onClick={onPrevSlide}
//     >
//       {children}
//     </button>
//   );
// }
// function NextSlideButton({ children }) {
//   const { onNextSlide } = useSlider();

//   return (
//     <button
//       className="absolute top-[50%] right-[0%] -translate-x-[0%] -translate-y-[50%] w-[40px] h-[40px] bg-pink-400 rounded-full text-xl z-20"
//       onClick={onNextSlide}
//     >
//       {children}
//     </button>
//   );
// }

// function Contents({ children, className }) {
//   const { selectedContent, contents, onContentClick, hasActivateBottom } =
//     useSlider();

//   if (!hasActivateBottom) return null;

//   return (
//     <div className={className}>
//       {contents.map((content, i) =>
//         children({
//           content,
//           selectedContent,
//           onClick: () => onContentClick(content, i),
//         })
//       )}
//     </div>
//   );
// }

// Slider.Slide = Slide;
// Slider.PrevSlideButton = PrevSlideButton;
// Slider.NextSlideButton = NextSlideButton;
// Slider.Contents = Contents;
