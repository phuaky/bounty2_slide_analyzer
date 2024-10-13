"use client";
import React from "react";
// import Image from "next/image";
import { SlideInfo } from "../../../shared/types"; // Adjust the import path as needed

interface SlidePreviewProps {
  slides: SlideInfo[];
  selectedSlide: number;
  setSelectedSlide: (slideNumber: number) => void;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({
  slides,
  selectedSlide,
  setSelectedSlide,
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Slides</h3>
      <div className="space-y-4 max-h-screen overflow-y-auto">
        {slides.map((slide) => {
          console.log(
            `Slide ${slide.slide_number} image URL:`,
            slide.image_url,
          );

          return (
            <div
              key={slide.slide_number}
              onClick={() => setSelectedSlide(slide.slide_number)}
              className={`cursor-pointer border ${
                selectedSlide === slide.slide_number
                  ? "border-blue-500"
                  : "border-gray-300"
              } rounded-md p-2`}
            >
              <div className="relative w-full aspect-video">
                <span className="absolute top-0 left-0 w-full h-full bg-black opacity-50">
                  this is the slide url: {slide.image_url}
                </span>
                {/* <Image
                  src={slide.image_url}
                  alt={`Slide ${slide.slide_number}`}
                  layout="fill"
                  objectFit="contain"
                  unoptimized={true}
                /> */}
                <img
                  src="https://1418d83d-5628-4e22-aa05-9e0a1e652aa6-00-1vrvyf7rhyugz.worf.replit.dev/0a59b103-3948-434a-9da1-f32b443dd85b/slide_1.png"
                  alt={`Slide ${slide.slide_number}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p className="text-center mt-2">Slide {slide.slide_number}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlidePreview;
