"use client";
import React from "react";
import Image from "next/image";

interface Slide {
  slide_number: number;
  image_url: string;
}

interface SlidePreviewProps {
  slides: Slide[];
  selectedSlide: number;
  setSelectedSlide: (slideNumber: number) => void;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({
  slides,
  selectedSlide,
  setSelectedSlide,
}) => {
  return (
    <div className="flex flex-wrap justify-center">
      {slides.map((slide) => (
        <div
          key={slide.slide_number}
          className={`m-2 cursor-pointer ${selectedSlide === slide.slide_number ? 'border-4 border-blue-500' : ''}`}
          onClick={() => setSelectedSlide(slide.slide_number)}
        >
          <Image
            src={slide.image_url}
            alt={`Slide ${slide.slide_number}`}
            width={200}
            height={150}
            style={{ objectFit: 'cover' }}
          />
          <p className="text-center mt-1">Slide {slide.slide_number}</p>
        </div>
      ))}
    </div>
  );
};

export default SlidePreview;
