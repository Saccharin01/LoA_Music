import Image from "next/image";
import { useState } from "react";
import { IstaticData } from "@/shared/interface/static.interface";

interface SampleImageProps {
  sampleImages: IstaticData["details"]["sampleImg"];
}

export default function SampleImage({ sampleImages }: SampleImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function openModal(image: string) {
    setSelectedImage(image);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedImage(null);
  }

  // 모달 창 외부 클릭 시 닫기
  function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold my-20">Sample Image</h1>

      {/* 반응형 및 그리드 배치 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 justify-items-center">
        {sampleImages.map((element, index) => (
          <div key={index} onClick={() => openModal(element)} className="cursor-pointer">
            <Image
              src={element}
              alt="이미지입니다!"
              width={300}
              height={400}
              className="w-auto h-auto"
              priority
            />
          </div>
        ))}
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={handleBackgroundClick}
        >
          <div className="relative">
            {/* 닫기 버튼 */}
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            {/* 원본 이미지 */}
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="원본 이미지입니다!"
                width={800}
                height={1000}
                className="w-auto h-auto"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
