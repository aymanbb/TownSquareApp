// Komponenttest for UserCard (brukes på leaderboardet).
// Vi rendrer komponenten til HTML med React sin server-renderer, og sjekker det brukeren faktisk ser.
// Det gjør at testen kjører i samme Workers-miljø som de andre testene, uten jsdom.
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { UserCard } from "@/features/auth/components/UserCard";

function render(ui: React.ReactElement) {
  const html = renderToStaticMarkup(ui);
  // Fjerner HTML-tagger slik at vi kan sjekke synlig tekst
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return { html, text };
}

describe("<UserCard />", () => {
  it("viser plassering, visningsnavn, brukernavn og level", () => {
    const { text } = render(
      <UserCard
        rankedSpot={1}
        user={{
          name: "steve",
          displayName: "Steve the Builder",
          level: 42,
          createdAt: "2026-01-15",
        }}
      />,
    );

    expect(text).toContain("#1");
    expect(text).toContain("Steve the Builder");
    expect(text).toContain("@steve");
    expect(text).toContain("LEVEL 42");
  });

  it("faller tilbake til brukernavn, level 0 og 'Unknown' når data mangler", () => {
    const { text } = render(<UserCard rankedSpot={3} user={{ name: "alex" }} />);

    expect(text).toContain("alex");
    expect(text).toContain("LEVEL 0");
    expect(text).toContain("Joined: Unknown");
  });

  it("viser bio bare når brukeren har en", () => {
    const uten = render(<UserCard rankedSpot={1} user={{ name: "a" }} />);
    const med = render(
      <UserCard rankedSpot={1} user={{ name: "a", bio: "Liker diamanter" }} />,
    );

    expect(uten.text).not.toContain("Liker diamanter");
    expect(med.text).toContain("Liker diamanter");
  });

  it("gir avataren en meningsfull alt-tekst", () => {
    const { html } = render(<UserCard rankedSpot={1} user={{ name: "steve" }} />);
    expect(html).toContain(`alt="steve&#x27;s avatar"`);
  });
});
