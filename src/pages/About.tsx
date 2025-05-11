
import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Hans",
    role: "Frontend Developer",
    description: "Passionate about creating intuitive user interfaces and seamless user experiences."
  },
  {
    name: "Chetan",
    role: "Backend Developer",
    description: "Skilled in building robust server-side applications and API integrations."
  },
  {
    name: "Srujana",
    role: "UI/UX Designer",
    description: "Creative mind focused on designing beautiful and functional user experiences."
  },
  {
    name: "Eshwar",
    role: "Full Stack Developer",
    description: "Versatile developer with expertise in both frontend and backend technologies."
  },
  {
    name: "Drishtee",
    role: "Project Manager",
    description: "Organized leader ensuring smooth project execution and team coordination."
  }
];

const About = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-lumicode-dark mb-4">About Lumicode</h1>
          <p className="text-lg text-lumicode-dark/80 max-w-2xl mx-auto">
            Lumicode was created as part of our Systems Analysis and Design course at CSU Long Beach.
            Inspired by our shared passion for technology, our team set out to make code generation more accessible, intuitive, and enjoyable for everyone.

          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-6 bg-white/90 hover:bg-white transition-colors">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-lumicode-accent rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-lumicode-dark" />
                </div>
                <h3 className="text-xl font-semibold text-lumicode-dark mb-2">{member.name}</h3>
                <p className="text-lumicode-accent font-medium mb-2">{member.role}</p>
                <p className="text-lumicode-dark/70">{member.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
