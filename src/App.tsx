import "./App.css";
import Left from "./Left";
import Right from "./Right";
function App() {
  return (
    <div className="min-h-screen  bg-[#7DA0CA] flex flex-col items-center font-winky tracking-wide text-[#021024] overflow-hidden">
      <h1 className="top-0 sm:text-5xl text-4xl sm:tracking-wider font-winky pt-8 sm:mb-15 mb-10 text-center text-nowrap">
        All the World's a stage
      </h1>
      <main className="sm:min-h-[43em] box-border bg-[#5483B3] sm:w-2/3 max-w-full min-w-2/3 min-h-[calc(100vh-20rem)] flex sm:flex-row  flex-col-reverse justify-between rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl mx-4 mb-4">
        <Left />
        <Right />
      </main>
    </div>
  );
}

export default App;
