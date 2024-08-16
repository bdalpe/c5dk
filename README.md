# Cloud Development Kit for Cribl

Create Cribl configuration from code!

The `c5dk` package name is a play on `cribl` and `cdk` similar to how the Cloud Development Kit for Kubernetes is named `cdk8s`. Cribl is shorted to `c` and `5`; number of letters between `c` and `l`.

## Usage

Example:
```typescript
const cribl = new Cribl();
const group = new Group(app, 'default', {});
const input = new Input(group, 'syslog', {...});
const route = new Route(group, 'default', {...});
const output = new Output(group, 'http', {...});

cribl.synth(); // writes output to $(cwd)/dist/...
```

Copy the YAML output to your leader and start Cribling!

## License

Released under the [MIT License](LICENSE.md). This project is not endorsed or supported by Cribl.

Copyright 2024 Brendan Dalpe
