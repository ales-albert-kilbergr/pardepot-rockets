import * as React from 'react';
import { ResolvedIntlConfig } from '@formatjs/intl/src/types';
/**
 * The `RocketBrowserAppIntlHook` enhance react intl by utility methods to
 * manipulate current locale and language, to store it into predifind or provided
 * cache or to access current locale or intl messages from anywhere in the
 * application.
 *
 * Hook allows to provide customized settings and implementation for key features
 * and returns a controller to access and manipulate its state.
 */

/**
 * Hardcoded list of enabled locales in the application.
 */
export enum RocketBrowserAppIntlLocale {
  DE_DE = 'de-DE',
  EN_US = 'en-US',
  FR_FR = 'fr-FR',
}
/**
 * List of possible error codes which can occure when working with
 * RocketBrowserAppIntlHook and its controller. Those can be used when handlig
 * with error boundaries.
 */
export enum RocketBrowserAppIntlErrorCode {
  MISSING_DATA_LOCALE = 'ERR_MISSING_DATA_LOCALE',
  INVALID_LOCALE = 'ERR_INVALID_LOCALE',
  FETCH_CACHE_FAILED = 'ERR_FETCH_CACHE_FAILED',
}
/**
 * List of state changing acctions, which occurs in the hook.
 */
export enum RocketBrowserAppIntlStateAction {
  SET_INTL_MESSAGE = 'SET_INTL_MESSAGE',
  SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE',
}
/**
 * List of options to choose from, when customizing locale cache behavior.
 *
 * Local and Session storage are predefined, but own implementation with
 * including server fetching request can be injected instead.
 */
export type IRocketBrowserAppLocaleCacheOption =
  | 'sessionStorage'
  | 'localStorage'
  | IRocketBrowserAppLocaleCache;
/**
 * Describes `RocketBrowserAppIntlHook` options.
 */
export interface IRocketBrowserAppIntlHookProps {
  /**
   * The `defaultLocale` set initial locale to be choosed on application start.
   * If not provided, "en-US" will be choosen. The `defaultLocale` is applied
   * only if there had been no locale stored in cache.
   */
  defaultLocale?: RocketBrowserAppIntlLocale;
  /**
   * The `localeCache` alloes to set a cache for current locale. There are two
   * prepared options: "localeStorage" and "sessionStorage", but custom
   * implementation can be provided. By default cache is not applied.
   */
  localeCache?: IRocketBrowserAppLocaleCacheOption;
  /**
   * The `reducer` allows to implement its own state management function for
   * the hook.
   */
  reducer?: IRocketBrowserAppIntlReducer;
}
/**
 * Describes a controller, which the hook returns back to access and manipulate
 * its own state.
 */
export interface IRocketBrowserAppIntlController {
  /**
   * The `intlMessages` represents currently used dictionary. The object
   * shoulds be treated as read-only
   */
  intlMessages: ResolvedIntlConfig['messages'] | null;
  /**
   * The `defaultLocale` expose what locale had been set as default.
   */
  defaultLocale: RocketBrowserAppIntlLocale;
  /**
   * The `enabledLocales` lists all available locales for application.
   */
  enabledLocales: RocketBrowserAppIntlLocale[];
  /**
   * The `currentLocale` is the currently applied locale
   */
  currentLocale?: RocketBrowserAppIntlLocale;
  /**
   * The `setLocale` allows to change a current locale in application, which
   * will result into rerender of all Formatted components and will load
   * a dictionary according to provided locale.
   */
  setLocale: (locale: RocketBrowserAppIntlLocale) => Promise<void>;
  /**
   * The `handleSetLocaleClick` is a helper method to be binded on an active
   * element, which is meant to change the locale by mouse click, like a button.
   *
   * There is one requirement, the element MUST hold an attribute `data-locale`
   * with a value which is supposed to be from RocketBrowserAppIntlLocale list.
   */
  handleSetLocaleClick: (event: React.MouseEvent<HTMLElement>) => void;
}
/**
 * Describes current locale cache. The cache is supposed to be asynchronous to
 * enable implementations fetching requests from server if needed.
 */
export interface IRocketBrowserAppLocaleCache {
  /**
   * Stores a new current locale into cache.
   */
  set: (locale: RocketBrowserAppIntlLocale) => Promise<void>;
  /**
   * Fetches current locale from cache.
   */
  get: () => Promise<RocketBrowserAppIntlLocale | undefined>;
}
/**
 * Describes hook state.
 */
export interface IRocketBrowserAppIntlHookState {
  /**
   * The `intlMessages` means currently loaded dictionary.
   */
  intlMessages: ResolvedIntlConfig['messages'] | null;
  /**
   * The `currentLocale` is currently used locale.
   */
  currentLocale?: RocketBrowserAppIntlLocale;
}
/**
 * The action indicates a change of IRocketBrowserAppIntlHookState#.intlMessages
 */
export interface ISetIntlMessageAction {
  type: RocketBrowserAppIntlStateAction.SET_INTL_MESSAGE;
  payload: ResolvedIntlConfig['messages'] | null;
}

/**
 * The action indicates a change of IRocketBrowserAppIntlHookState#.currentLocale
 */
export interface ISetCurrentLocaleAction {
  type: RocketBrowserAppIntlStateAction.SET_CURRENT_LOCALE;
  payload: RocketBrowserAppIntlLocale | undefined;
}

export type IRocketBrowserAppIntlReducer = React.Reducer<
  IRocketBrowserAppIntlHookState,
  ISetIntlMessageAction | ISetCurrentLocaleAction
>;

export type IRocketBrowserAppIntlHook = (
  props: IRocketBrowserAppIntlHookProps
) => IRocketBrowserAppIntlController;
/**
 * Defines all well known errors which may occure inside of the hook. The
 * typed error can be easily cached and procesed in error boudary compoments.
 */
export class RocketBrowserAppIntlError extends Error {
  constructor(
    public readonly code: RocketBrowserAppIntlErrorCode,
    public readonly reason: string,
    public readonly origError?: Error
  ) {
    super(`[${RocketBrowserAppIntlError.name}.${code}]: ${reason}`);
  }
  /**
   * There is no data-locale attribute on element, which initiated a click
   * event in order to set new current locale.
   */
  public static MissingLocaleData() {
    return new RocketBrowserAppIntlError(
      RocketBrowserAppIntlErrorCode.MISSING_DATA_LOCALE,
      `Html element must have populated attribute "data-locale"!`
    );
  }
  /**
   * The locale provided to set the current or default locale is not in the list
   * of enabled locales.
   */
  public static InvalidLocale(locale: string | undefined) {
    return new RocketBrowserAppIntlError(
      RocketBrowserAppIntlErrorCode.INVALID_LOCALE,
      `Invalid locale "${locale}" provided. ` +
        `Only "${enabledLocaleToArray().join(', ')}" are enabled!`
    );
  }
  /**
   * An attempt to fetch current locale from cache failed. This error may
   * occure specialy with custom current locale cache implementations.
   */
  public static FetchFromCacheFailed(
    cache: IRocketBrowserAppLocaleCache,
    origError: Error
  ) {
    return new RocketBrowserAppIntlError(
      RocketBrowserAppIntlErrorCode.FETCH_CACHE_FAILED,
      `Failed to load current locale from cache "${cache.constructor.name}"`,
      origError
    );
  }
}
/**
 * Loads intl messages from precompiled language files.
 */
function loadLocaleData(locale: RocketBrowserAppIntlLocale) {
  const normalizedLocale = locale.toLocaleLowerCase();

  return import(`../assets/compiled-intl/${normalizedLocale}.json`);
}
/**
 * Turns the enabled locale enum into array of values.
 */
function enabledLocaleToArray(): RocketBrowserAppIntlLocale[] {
  return Reflect.ownKeys(RocketBrowserAppIntlLocale)
    .filter((key) => typeof key === 'string')
    .map((key) => Reflect.get(RocketBrowserAppIntlLocale, key));
}
/**
 * Provides a type guard to check if given value is type of RocketBrowserAppIntlLocale
 */
function isValidLocale(
  locale: string | undefined | null
): locale is RocketBrowserAppIntlLocale {
  return enabledLocaleToArray().includes(locale as RocketBrowserAppIntlLocale);
}
/**
 * Reads locale from a click event. Function expects the event to be
 * originated by an HTMLElement with `data-locale` attribute beeing populated.
 *
 * @throws {RocketBrowserAppIntlError}
 */
function getLocaleFromClickEvent(
  event: React.MouseEvent<HTMLElement>
): RocketBrowserAppIntlLocale {
  const locale: string | undefined = event.currentTarget.dataset['locale'];

  if (!locale) {
    throw RocketBrowserAppIntlError.MissingLocaleData();
  }

  if (!isValidLocale(locale)) {
    throw RocketBrowserAppIntlError.InvalidLocale(locale);
  }

  return locale;
}
/**
 * Resolves `localeCache` options into current locale cache implementation.
 */
function resolveLocaleCache(localeCache?: IRocketBrowserAppLocaleCacheOption) {
  if (localeCache === 'localStorage') {
    return RocketBrowserAppLocaleStorage.fromLocalStorage();
  } else if (localeCache === 'sessionStorage') {
    return RocketBrowserAppLocaleStorage.fromSessionStorage();
  } else if (typeof localeCache === 'object' && localeCache !== null) {
    return localeCache;
  } else {
    return null;
  }
}
/**
 * Default implementation of the hook state management.
 */
const rocketBrowserAppIntlReducer: IRocketBrowserAppIntlReducer = (
  state,
  action
) => {
  switch (action.type) {
    case RocketBrowserAppIntlStateAction.SET_CURRENT_LOCALE:
      return { ...state, currentLocale: action.payload };
    case RocketBrowserAppIntlStateAction.SET_INTL_MESSAGE:
      return { ...state, intlMessages: action.payload };
    default:
      return state;
  }
};

const defaultProps: Partial<IRocketBrowserAppIntlHookProps> &
  Required<Pick<IRocketBrowserAppIntlHookProps, 'defaultLocale' | 'reducer'>> =
  {
    defaultLocale: RocketBrowserAppIntlLocale.EN_US,
    reducer: rocketBrowserAppIntlReducer,
  };
/**
 * Default current locale storage implementation supporting locale or session
 * storage.
 */
class RocketBrowserAppLocaleStorage implements IRocketBrowserAppLocaleCache {
  private constructor(
    private storage: Storage,
    private cacheKey: string = 'RocketBrowserAppLocaleCache'
  ) {}

  public get() {
    const storedLocale = this.storage.getItem(this.cacheKey);
    return Promise.resolve(
      isValidLocale(storedLocale) ? storedLocale : undefined
    );
  }

  public set(locale: RocketBrowserAppIntlLocale | undefined) {
    this.storage.setItem(this.cacheKey, locale || '');
    return Promise.resolve();
  }

  public static fromLocalStorage() {
    return new RocketBrowserAppLocaleStorage(localStorage);
  }

  public static fromSessionStorage() {
    return new RocketBrowserAppLocaleStorage(sessionStorage);
  }
}

export const useRocketBrowserAppIntlProvider: IRocketBrowserAppIntlHook = (
  props
) => {
  // 1) Merges props with default props
  const normalizedProps = React.useMemo(
    () => Object.assign(defaultProps, props),
    [props]
  );
  // 2) Initialize the hook state.
  const [state, dispatch] = React.useReducer<IRocketBrowserAppIntlReducer>(
    normalizedProps.reducer,
    {
      currentLocale: undefined,
      intlMessages: null,
    }
  );
  // 3) Resolve current locale cache option to an implementation if required.
  const cache = React.useMemo(
    () => resolveLocaleCache(normalizedProps.localeCache),
    [normalizedProps.localeCache]
  );
  // Define setLocale callback to expose current locale state manipulation.
  const setLocale = React.useCallback(
    async (locale: RocketBrowserAppIntlLocale) => {
      const intlMessages = await loadLocaleData(locale);
      dispatch({
        type: RocketBrowserAppIntlStateAction.SET_INTL_MESSAGE,
        payload: intlMessages,
      });
      dispatch({
        type: RocketBrowserAppIntlStateAction.SET_CURRENT_LOCALE,
        payload: locale,
      });

      if (cache) {
        await cache.set(locale);
      }
    },
    [cache, dispatch]
  );
  // Runs on component init after first render or if the default locale changes.
  React.useEffect(() => {
    if (cache) {
      cache
        .get()
        .then((locale) => setLocale(locale || normalizedProps.defaultLocale))
        .catch((error) =>
          RocketBrowserAppIntlError.FetchFromCacheFailed(cache, error)
        );
    } else {
      setLocale(normalizedProps.defaultLocale);
    }
    // We want to run this effect on application init or only if for some
    // unseen reason the `defaultLocale` would change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedProps.defaultLocale, cache]);
  // Exposes a callback to handle mouse event meant to change current locale.
  const handleSetLocaleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const locale = getLocaleFromClickEvent(event);
      setLocale(locale);
    },
    [setLocale]
  );
  // Publish the hook controller.
  return React.useMemo<IRocketBrowserAppIntlController>(
    () => ({
      setLocale,
      intlMessages: state.intlMessages,
      defaultLocale: normalizedProps.defaultLocale,
      enabledLocales: enabledLocaleToArray(),
      currentLocale: state.currentLocale,
      handleSetLocaleClick,
    }),
    [
      setLocale,
      state.intlMessages,
      state.currentLocale,
      normalizedProps.defaultLocale,
      handleSetLocaleClick,
    ]
  );
};

export const RocketBrowserAppIntlContext =
  React.createContext<IRocketBrowserAppIntlController | null>(null);

export function useRocketBrowserAppIntl() {
  return React.useContext(RocketBrowserAppIntlContext);
}
