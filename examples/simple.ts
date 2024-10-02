import {Cribl, SyslogInput} from "c5dk";

const cribl = new Cribl();
new SyslogInput(cribl, 'in_syslog_c5dk', {port: 9514});

// creates a ./dist/local/cribl/outputs.yml file
cribl.synth();
