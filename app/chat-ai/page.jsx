"use client"

const Page = () => {

  const handleClick = () => {
    alert('Visit after few days Please 🫣🫣')
  }

  return (
    <div className="m-5 p-9 w-full flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-white">
      <div className="text-center p-8 rounded-xl shadow-xl bg-white bg-opacity-20 max-w-lg">
        <h1 className="text-4xl font-semibold mb-4">Chat AI Coming Soon!</h1>
        <p className="text-lg mb-6">
          We are working hard to bring you a real-time chat experience. Stay
          tuned for updates!
        </p>
        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-6">
          <div className="h-full w-1/3 bg-gradient-to-r from-green-400 to-blue-500 animate-progress"></div>
        </div>
        <button
          onClick={handleClick}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-lg font-medium text-white rounded-lg shadow-lg hover:opacity-80 transition"
        >
          Notify Me When Live
        </button>
      </div>
    </div>
  );
};

export default Page;
