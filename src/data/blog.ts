import type { BlogPost } from '@/types'

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'instancing-three-thousand-nodes',
    title: 'Rendering 3,000 nodes at 60fps with Three.js instancing',
    excerpt:
      'How a naive mesh-per-node graph view brought a MacBook to its knees, and what instanced meshes plus a spatial hash fixed.',
    date: '2026-05-02',
    readTimeMinutes: 7,
    tags: ['three.js', 'performance', 'webgl'],
    featured: true,
    content: `## The problem

A knowledge-graph view with one \`Mesh\` per node felt fine at 200 nodes and fell off a cliff at 3,000. Draw calls, not triangle count, were the bottleneck.

## Instancing

Swapping individual meshes for a single \`InstancedMesh\` collapsed thousands of draw calls into one. Position updates moved into a per-frame matrix write instead of touching the scene graph.

## Spatial hashing for picking

Raycasting against 3,000 instances per pointer move is wasteful. A coarse spatial hash narrowed candidates before the raycast ran, and pointer-move picking dropped from ~9ms to under 1ms.

## Result

Frame time went from 31ms to 6ms on a mid-tier laptop, with headroom left for bloom and depth-of-field.`,
  },
  {
    id: 'b2',
    slug: 'event-sourced-billing-ledger',
    title: 'Why we event-sourced our billing ledger',
    excerpt:
      'Invoices need an audit trail, not just a current state. Notes from building Ledgerline on an append-only event store.',
    date: '2026-03-18',
    readTimeMinutes: 9,
    tags: ['architecture', 'postgresql', 'billing'],
    content: `## Current state isn't enough

Support asks "why does this invoice say $412?" more often than "what does this invoice say now?" A mutable \`invoices\` table can't answer the first question.

## The event log

Every balance change is an immutable event: \`InvoiceIssued\`, \`PaymentApplied\`, \`CreditNoteIssued\`. Current state is a projection, rebuilt by replaying events for a tenant.

## Trade-offs

Reads got slower without a projection cache, so we added a materialized view refreshed on write. Migrations got easier — we replay history into new shapes instead of writing lossy \`ALTER TABLE\` scripts.

## Would we do it again

Yes, for anything touching money. No, for a CRUD admin panel — the ceremony isn't worth it there.`,
  },
  {
    id: 'b3',
    slug: 'offline-first-conflict-resolution',
    title: 'Conflict resolution for a field app with no signal',
    excerpt:
      'Two technicians editing the same inspection offline, syncing hours apart. How Fieldkit merges without losing data.',
    date: '2026-01-22',
    readTimeMinutes: 6,
    tags: ['react-native', 'offline-first', 'sync'],
    content: `## Constraints

Field sites often have zero signal for a full shift. Two technicians can inspect overlapping equipment and sync at the same depot that evening.

## Last-write-wins was wrong

Timestamps on unreliable devices aren't trustworthy enough to silently discard a technician's data. We needed merge, not overwrite.

## Field-level merge

Each inspection record merges field by field. Scalar fields use a vector clock to detect true conflicts; list fields like photos and notes union instead of replace.

## What we still surface to humans

True conflicts — two different answers to the same checklist item — get flagged in a review queue instead of resolved silently. Automation should not guess on anything that changes a compliance record.`,
  },
]
