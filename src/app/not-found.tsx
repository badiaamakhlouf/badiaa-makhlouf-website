import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <p className="font-mono text-xs text-signal">404 · route not found</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">This node isn&apos;t in the graph.</h1>
      <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
