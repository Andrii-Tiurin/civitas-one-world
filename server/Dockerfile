# CIVITAS experimental Voxelize server. Source is upstream MIT licensed.
FROM rust:1.85-bookworm AS build
RUN apt-get update && apt-get install -y --no-install-recommends protobuf-compiler pkg-config libssl-dev git clang cmake && rm -rf /var/lib/apt/lists/*
WORKDIR /build
RUN git clone --depth 1 https://github.com/voxelize/voxelize.git upstream
WORKDIR /build/upstream
# Render expects the server to bind to its injected PORT; upstream demo defaults to 4000.
RUN sed -i 's/\.port(4000)/.port(10000)/' examples/server/main.rs
RUN cargo build --release --example demo
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates libssl3 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /build/upstream/target/release/examples/demo /app/voxelize-server
EXPOSE 10000
ENV PORT=10000
CMD ["/app/voxelize-server"]
