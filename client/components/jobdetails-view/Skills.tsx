const skills = ["React", "JavaScript", "Tailwind", "UI Design"];

const Skills = () => {
  return (
    <section className="mb-6">
      <h2 className="font-semibold mb-3">Required Skills</h2>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
