const TextArea = ({ label, value, handleChange }) => {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <textarea
        rows={10}
        className="mt-1 focus:outline-none border-[1px] border-slate-400 rounded-sm w-full"
        value={value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
