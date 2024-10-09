"use client";
import React from "react";
import Image from "next/image";

interface SlidePreviewProps {
  numberOfSlides: number;
  selectedSlide: number;
  setSelectedSlide: (slideNumber: number) => void;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({
  numberOfSlides,
  selectedSlide,
  setSelectedSlide,
}) => {
  const slides = Array.from({ length: numberOfSlides }, (_, i) => i + 1);

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Slides</h3>
      <div className="space-y-4 max-h-screen overflow-y-auto">
        {slides.map((slideNumber) => (
          <div
            key={slideNumber}
            onClick={() => setSelectedSlide(slideNumber)}
            className={`cursor-pointer border ${
              selectedSlide === slideNumber
                ? "border-blue-500"
                : "border-gray-300"
            } rounded-md p-2`}
          >
            <div className="relative w-full aspect-video">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/slide-thumbnails/${slideNumber}`}
                alt={`Slide ${slideNumber}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-center mt-2">Slide {slideNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidePreview;
