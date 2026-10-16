/**
 * Database configuration and conventions for the MTPL Travel Platform.
 * 
 * Note: Do NOT store the connection string (MONGODB_URI) here.
 * The connection string must remain securely in environment variables.
 */
export const databaseConfig = {
  /**
   * Default options applied to all Mongoose schemas in the project.
   */
  defaultSchemaOptions: {
    // Enforce Mongoose to automatically add and manage createdAt and updatedAt fields
    timestamps: true,
  },
} as const;

export type DatabaseConfig = typeof databaseConfig;
