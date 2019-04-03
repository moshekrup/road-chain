### Create initial tendermint config
```bash
mkdir tendermint

docker run \
    --rm \
    --user 1000:1000 \
    -v $(pwd)/tendermint:/tendermint \
    tendermint/tendermint:v0.31.3 \
    init
```

### Merge with our tendermint example
```bash
meld tendermint tendermint-example
```