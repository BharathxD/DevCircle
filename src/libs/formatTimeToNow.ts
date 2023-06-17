import locale from 'date-fns/locale/en-US';
import { formatDistanceToNowStrict } from 'date-fns';

// Define the format distance locale
const formatDistanceLocale = {
    lessThanXSeconds: 'just now',
    xSeconds: 'just now',
    halfAMinute: 'just now',
    lessThanXMinutes: '{{count}}m',
    xMinutes: '{{count}}m',
    aboutXHours: '{{count}}h',
    xHours: '{{count}}h',
    xDays: '{{count}}d',
    aboutXWeeks: '{{count}}w',
    xWeeks: '{{count}}w',
    aboutXMonths: '{{count}}m',
    xMonths: '{{count}}m',
    aboutXYears: '{{count}}y',
    xYears: '{{count}}y',
    overXYears: '{{count}}y',
    almostXYears: '{{count}}y',
};

/**
 * The function formats a distance in time with options for adding a suffix and comparison.
 * @param { string } token - The token is a string that represents the type of distance to be formatted,
 * such as "year", "month", "day", "hour", "minute", or "second".
 * @param { number } count - The number of units to format the distance to (e.g. 2 days, 3 hours, etc.).
 * @param { { addSuffix?: boolean, comparison?: number } } [options] - The `options` parameter is an optional object.
 * @returns a string that represents the formatted distance based on the input parameters. The output
 * string can include the count of the distance and a suffix indicating whether the distance is in the
 * past or in the future. The specific output depends on the values of the input parameters and the
 * options object.
 */
const formatDistance = (
    token: keyof typeof formatDistanceLocale,
    count: number,
    options?: { addSuffix?: boolean, comparison?: number }
): string => {
    const { addSuffix = false, comparison = 0 } = options || {};
    // Get the format distance locale string and replace the count
    const result = formatDistanceLocale[token].replace('{{count}}', count.toString());
    if (!addSuffix) return result;
    // Return the result with 'in' prefix
    if (comparison > 0) return 'in ' + result;
    return result === 'just now' ? result : result + ' ago';
}


/**
 * The function formats a given date to a string representing the time distance from now, using strict
 * formatting and a specified locale.
 * @param {Date} date - The `date` parameter is a `Date` object representing the date and time to be
 * formatted.
 * @returns The function `formatTimeToNow` is returning a string that represents the time distance
 * between the input `date` and the current time, formatted in a human-readable way. The
 * `formatDistanceToNowStrict` function is used to calculate the distance, and the `locale` object is
 * used to customize the formatting of the output string. The `addSuffix` option is set to `true`
 */
const formatTimeToNow = (date: Date) => formatDistanceToNowStrict(date, { addSuffix: true, locale: { ...locale, formatDistance } });

export default formatTimeToNow;
