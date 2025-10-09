import ConstructorIOClient from '@constructor-io/constructorio-client-javascript';
import {
  ConstructorClientOptions,
  Nullable,
} from '@constructor-io/constructorio-client-javascript/lib/types';
import { useMemo } from 'react';
import version from '../version';

type UseCioClientProps = {
  apiKey?: string;
  cioClient?: Nullable<ConstructorIOClient>;
  options?: Omit<ConstructorClientOptions, 'apiKey' | 'sendTrackingEvents' | 'version'>;
};

/**
 * A custom hook to create or use an existing ConstructorIOClient instance
 *
 * @param {UseCioClientProps} props - The properties for the hook
 * @param {string} [props.apiKey] - The API key for Constructor.io. Required if `cioClient` is not provided
 * @param {Nullable<ConstructorIOClient>} [props.cioClient] - An existing ConstructorIOClient instance
 * If provided, it will be used instead of creating a new one
 * @param {Omit<ConstructorClientOptions, 'apiKey' | 'sendTrackingEvents' | 'version'>} [props.options]
 * - Additional options for the ConstructorIOClient instance
 *
 * @returns {Nullable<ConstructorIOClient>} - A memoized instance of ConstructorIOClient, or `null` if
 * environment is not suitable for JS client instantiation (eg. server-side rendering)
 *
 * @throws {Error} - Throws an error if neither `apiKey` nor `cioClient` is provided
 */
const useCioClient = ({
  apiKey,
  cioClient,
  options,
}: UseCioClientProps = {}): Nullable<ConstructorIOClient> => {
  if (!apiKey && !cioClient) {
    throw new Error('API Key or Constructor Client required');
  }

  const memoizedCioClient = useMemo(() => {
    if (cioClient) return cioClient;
    if (apiKey && typeof window !== 'undefined') {
      return new ConstructorIOClient({
        apiKey,
        sendTrackingEvents: false,
        version: `cio-ui-recommendations-${version}`,
        ...options,
      });
    }

    return null;
  }, [apiKey, cioClient, options]);

  return memoizedCioClient!;
};

export default useCioClient;
