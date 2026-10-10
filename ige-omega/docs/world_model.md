# World Model

The in-memory graph stores entities, typed relations and causal edges with bounded confidence/probability values. A causal edge is a declared hypothesis plus evidence labels, not proof of causation. SQL migrations prepare relational persistence, but the graph repository is not yet wired to PostgreSQL.
