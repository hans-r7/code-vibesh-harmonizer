import { Sparkles } from "lucide-react";

const teamMembers = [
  { name: "Hans", role: "Frontend Developer", initials: "HA" },
  { name: "Chetan", role: "Backend Developer", initials: "CH" },
  { name: "Srujana", role: "UI/UX Designer", initials: "SR" },
  { name: "Eshwar", role: "Full Stack Developer", initials: "ES" },
  { name: "Drishtee", role: "Project Manager", initials: "DR" },
];

const About = () => {
  return (
    <main className="flex-1 relative bg-gradient-hero pt-32 pb-24 px-6">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/60 backdrop-blur-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">Our story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About <span className="text-gradient">Lumicode</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built by five students at CSU Long Beach for our Systems Analysis and Design course.
            We wanted to make code generation feel effortless — and a little magical.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all animate-fade-in-up text-center"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-shadow">
                <span className="text-primary-foreground font-semibold text-sm">
                  {member.initials}
                </span>
              </div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default About;
