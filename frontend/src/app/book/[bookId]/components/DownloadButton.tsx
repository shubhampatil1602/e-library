'use client';

const DownloadButton = ({ fileLink }: { fileLink: string }) => {
  const handleDownload = () => {
    window.open(fileLink, '_blank');
  };
  return (
    <button
      onClick={handleDownload}
      className='h-10 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-orange-600 active:bg-orange-700'
    >
      Download
    </button>
  );
};

export default DownloadButton;
