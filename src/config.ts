export interface PidConfig {
  strict: boolean;
  identifiers: {
    orcid?: string;
    zenodoDoi?: string;
    isni?: string;
    dataCiteDoi?: string;
  };
  expected: {
    namespace?: string;
    personName?: string;
    geographicOrigin?: string;
  };
}

const env = (name: string): string | undefined => {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
};

export const config: PidConfig = Object.freeze({
  strict: env("GENESIS_PID_STRICT") !== "false",
  identifiers: Object.freeze({
    orcid: env("GENESIS_PID_ORCID"),
    zenodoDoi: env("GENESIS_PID_ZENODO_DOI"),
    isni: env("GENESIS_PID_ISNI"),
    dataCiteDoi: env("GENESIS_PID_DATACITE_DOI"),
  }),
  expected: Object.freeze({
    namespace: env("GENESIS_PID_NAMESPACE"),
    personName: env("GENESIS_PID_PERSON_NAME"),
    geographicOrigin: env("GENESIS_PID_GEOGRAPHIC_ORIGIN"),
  }),
});
