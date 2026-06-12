# SenseTrust Emission Integrity Contract

Status: v0.7 simulated contract.

## Purpose

The emission integrity contract proves that a simulated emitted DNDA document is bound to the document hash, trust object, evidence manifest, clinical commit chain, document state, signatures and timestamp.

## Emission hash inputs

`emission_hash` is calculated from:

- document hash;
- trust object hash;
- evidence manifest hash;
- clinical chain hash;
- document state hash;
- professional signature hash;
- institutional signature hash;
- logical timestamp hash.

## Integrity rule

If any critical hash changes after emission, the emission object must fail validation. This protects the issuance event from silent mutation.

## Relationship with previous layers

- v0.4 supplies the trust object and evidence manifest hashes.
- v0.5 supplies the clinical chain identity and commit linkage.
- v0.6 supplies document state and state hash.
- v0.7 freezes the emission boundary with signatures and timestamp.

## Public exposure

Only metadata can be public. Full document content and clinical details remain private.
