import { writable } from "svelte/store";

type DataFile = {
  fileName: string;
  /**Display name of datafile */
  displayName: string;
  /**Type of data */
  type: string;
  /**Relative path to file from appData directory*/
  path: string;
};

type Alliance = "Red" | "Blue";

type MatchResult = {
  /** Alliance (Red or Blue) */
  alliance: Alliance;
  /** Total final score */
  final: number;
  /** Total number fouls */
  foul: number;
  /** Total auto score */
  auto: number;
};

type MatchInfo =
  | {
      /**Unique key of match data object */
      key: string;
      /**FRC competition key string */
      competition: string;
      /**FRC match key */
      matchKey: string;
      /**Display name of match */
      matchName: string;
      /**Distance between first and last timestamp accross all data */
      maxDuration: number;
      /**Timestamp of start of auto */
      autoStartTime: number;
      /**Timestamp of start of teleop */
      teleOpStartTime: number;
      /**Timestamp of end of match */
      matchEndTime: number;
      /**List of data files available */
      data: DataFile[];
      /**Match scores from FRC */
      results: MatchResult[] | null;
    }
  | undefined;

export const selectedMatch = writable<MatchInfo>(undefined);
