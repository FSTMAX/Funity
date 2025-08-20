import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users, Star, TrendingUp, ThumbsUp} from "lucide-react";
import { gameConfig } from "@/gameConfig";

interface ProjectData {
  id: string;
  universeId: string;
  title: string;
  description: string;
  status: string;
  genre: string;
  features: string[];
  stats: {
    rating: number;
    favorites: string;
    totalPlays: string;
  };
}

// Format numbers like 11.1M+
const formatCount = (num: number): string => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B+";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M+";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K+";
  return num.toString();
};

// Convert votes → 0–5 star rating
const calcRating = (upVotes: number, downVotes: number): number => {
  const total = upVotes + downVotes;
  if (total === 0) return 0;
  const ratio = upVotes / total;
  return Math.round((ratio * 100) * 10) / 10;
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const updatedProjects: ProjectData[] = [];

        for (const project of gameConfig) {
          // fetch game info
          const gameRes = await fetch(
            `https://games.roproxy.com/v1/games?universeIds=${project.universeId}`
          );
          const gameData = await gameRes.json();
          const gameInfo = gameData.data?.[0];

          // fetch votes
          const voteRes = await fetch(
            `https://games.roproxy.com/v1/games/${project.universeId}/votes`
          );
          const voteData = await voteRes.json();
          const voteInfo = voteData;

          updatedProjects.push({
            id: project.placeId,
            universeId: project.universeId,
            title: gameInfo?.name || "Unknown Game",
            description: project.description,
            status: project.status,
            genre: project.genre,
            features: project.features,
            stats: {
              rating: calcRating(voteInfo?.upVotes || 0, voteInfo?.downVotes || 0),
              favorites: formatCount(gameInfo?.favoritedCount || 0),
              totalPlays: formatCount(gameInfo?.visits || 0),
            },
          });
        }

        setProjects(updatedProjects);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects(); // fetch once on page load
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-gradient" id="games">Our Games</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our portfolio of successful Roblox experiences, each designed to deliver
            unique gameplay and unforgettable moments for our growing community.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
           <Card
          key={project.id}
          className="relative bg-gradient-card border-2 border-border/100 transition-gaming hover:scale-105 hover:border-primary/100 group animate-slide-up bg-cover bg-center"
          style={{
            animationDelay: `${index * 0.2}s`,
            backgroundImage: `url('/${project.universeId}-thumbnail.jpg')` // remove /public
          }}

            >
              <div className="absolute inset-0 bg-black/80 rounded-md pointer-events-none" />
              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gradient mb-2">{project.title}</CardTitle>
                    <CardDescription className="text-lg">{project.genre}</CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/20 text-primary border-primary/30"
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 relative z-10">
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{project.description}</p>

                {/* Bottom section */}
                <div className="flex flex-col gap-4 mt-auto">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="outline"
                          className="border-accent/30 text-accent hover:bg-accent/20"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <ThumbsUp className="w-4 h-4 text-green-400" />
                        <span className="font-bold text-green-400">{project.stats.rating + "%" ?? "N/A"}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-4 h-4 text-yellow-400" />
                        <span className="font-bold text-yellow-400">{project.stats.favorites ?? "N/A"}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Favorites</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span className="font-bold text-blue-400">{project.stats.totalPlays ?? "N/A"}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Total Plays</div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <a
                    href={`https://www.roblox.com/games/${project.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold transition-gaming hover:scale-105 group-hover:glow-primary flex items-center justify-center gap-2"
                  >
                    Play on Roblox
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>


            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
