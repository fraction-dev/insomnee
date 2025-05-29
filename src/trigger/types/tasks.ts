export enum TriggerTasks {
    /**
     * Cron job to fetch currency rates
     */
    FETCH_CURRENCY_RATES = 'fetch-currency-rates',

    /**
     * Setup Instagram messaging task agent for a new organization integration
     */
    SETUP_INSTAGRAM_MESSAGING_TASK_AGENT = 'setup-instagram-messaging-task-agent',

    /**
     * Receive Instagram message from webhook and process it
     */
    EXECUTE_INSTAGRAM_MESSAGE = 'execute-instagram-message',

    /**
     * Create AI details of the uploaded 'PUBLIC' files.
     */
    EXECUTE_FILE_AI_DETAILS = 'execute-file-ai-details',
}
