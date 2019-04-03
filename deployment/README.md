### Create initial tendermint config
```bash
mkdir tendermint

docker run \
    --rm \
    --user 502:20 \
    -v $(pwd)/tendermint:/tendermint \
    tendermint/tendermint:0.22.8 \
    init

docker run \
    --rm \
    --user 502:20 \
    -v $(pwd)/tendermint:/tendermint \
    tendermint/tendermint:0.22.8 \
    show_node_id
```

### Merge with our tendermint example
```bash
meld tendermint tendermint-example
```
