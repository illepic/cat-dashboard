function CurrentButton({ text, isCurrent, doStuff }) {
  return (
    <button
      className={`btn-blue block ${isCurrent && 'bg-blue-400'}`}
      onClick={doStuff}
    >
      {text}
    </button>
  );
}
export default CurrentButton;
