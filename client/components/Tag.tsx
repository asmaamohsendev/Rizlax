function Tag({ text }: { text: string }) {
  return (
    <span className="bg-[#C2EE71]/20 px-4 py-1 rounded-full font-medium text-xs text-primary-lime">
      {text}
    </span>
  );
}

export default Tag;