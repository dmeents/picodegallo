/**
 * custom user config for picodegallo
 */
export interface PicoConfig {
  // where to look for a requested recipe
  recipePath?: string;
  // additional recipes to load from node_modules
  recipes?: Array<string>;
}
