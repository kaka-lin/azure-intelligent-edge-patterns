import { ThunkAction, Action } from '@reduxjs/toolkit';
import { State } from 'RootStateType';

export type Project = {
  isLoading: boolean;
  data: ProjectData;
  originData: ProjectData;
  trainingMetrics: TrainingMetrics;
  status: Status;
  error: Error;
};

export type TrainingMetrics = {
  prevConsequence: Consequence;
  curConsequence: Consequence;
};

export enum Status {
  None = 'none',
  WaitTraining = 'waitTraining',
  FinishTraining = 'finishTraining',
  TrainingFailed = 'trainingFailed',
  StartInference = 'startInference',
}

export type Consequence = {
  precision: number;
  recall: number;
  mAP: number;
};

export enum InferenceMode {
  PartDetection = 'PD',
  PartCounting = 'PC',
  EmployeeSafety = 'ES',
  DefectDetection = 'DD',
}

export enum InferenceProtocol {
  Http = 'http',
  GRPC = 'grpc',
}

export enum InferenceSource {
  LVA = 'lva',
  CaptureModule = 'capture_module',
}

export type ProjectData = {
  id: number;
  /* --- Configured by user --- */
  name: string;
  trainingProject: number;
  cameras: number[];
  parts: number[];
  /* --- Advanced options --- */
  // Retraining
  needRetraining: boolean;
  accuracyRangeMin: number;
  accuracyRangeMax: number;
  maxImages: number;
  // Cloud message
  sendMessageToCloud: boolean;
  framesPerMin: number;
  probThreshold: number;
  // Send video to cloud
  SVTCisOpen: boolean;
  SVTCcameras: number[];
  SVTCparts: number[];
  SVTCconfirmationThreshold: number;
  SVTCRecordingDuration: number;
  // Camera fps
  setFpsManually: boolean;
  fps: number;
  totalRecomendedFps: number;
  recomendedFps: number;
  // Protocol of inference
  inferenceProtocol: InferenceProtocol;
  // Disalbe live video
  disableVideoFeed: boolean;
  /* --- Other --- */
  inferenceMode: InferenceMode;
  deployTimeStamp: string;
  inferenceSource: InferenceSource;
};

// Describing the different ACTION NAMES available
export const GET_PROJECT_REQUEST = 'GET_PROJECT_REQUEST';
export type GetProjectRequestAction = {
  type: typeof GET_PROJECT_REQUEST;
};

export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS';
export type GetProjectSuccessAction = {
  type: typeof GET_PROJECT_SUCCESS;
  payload: {
    project: ProjectData;
    hasConfigured: boolean;
  };
};

export const GET_PROJECT_FAILED = 'GET_PROJECT_FAILED';
export type GetProjectFailedAction = {
  type: typeof GET_PROJECT_FAILED;
  error: Error;
};

export const GET_TRAINING_METRICS_REQUEST = 'GET_TRAINING_METRICS_REQUEST';
export type GetTrainingMetricsRequestAction = {
  type: typeof GET_TRAINING_METRICS_REQUEST;
};

export const GET_TRAINING_METRICS_SUCCESS = 'GET_TRAINING_METRICS_SUCCESS';
export type GetTrainingMetricsSuccessAction = {
  type: typeof GET_TRAINING_METRICS_SUCCESS;
  payload: {
    prevConsequence: Consequence;
    curConsequence: Consequence;
  };
};

export const GET_TRAINING_METRICS_FAILED = 'GET_TRAINING_METRICS_FAILED';
export type GetTrainingMetricsFailedAction = {
  type: typeof GET_TRAINING_METRICS_FAILED;
  error: Error;
};

export const POST_PROJECT_REQUEST = 'POST_PROJECT_REQUEST';
export type PostProjectRequestAction = {
  type: typeof POST_PROJECT_REQUEST;
};

export const POST_PROJECT_SUCCESS = 'POST_PROJECT_SUCCESS';
export type PostProjectSuccessAction = {
  type: typeof POST_PROJECT_SUCCESS;
  data: ProjectData;
};

export const POST_PROJECT_FALIED = 'POST_PROJECT_FALIED';
export type PostProjectFaliedAction = {
  type: typeof POST_PROJECT_FALIED;
  error: Error;
};

export const UPDATE_PROJECT_DATA = 'UPDATE_PROJECT_DATA';
export type UpdateProjectDataAction = {
  type: typeof UPDATE_PROJECT_DATA;
  payload: Partial<ProjectData>;
};

export const START_INFERENCE = 'START_INFERENCE';
export type StartInferenceAction = {
  type: typeof START_INFERENCE;
};

export const STOP_INFERENCE = 'STOP_INFERENCE';
export type StopInferenceAction = {
  type: typeof STOP_INFERENCE;
};

export const TRAIN_SUCCESS = 'TRAIN_SUCCESS';
export type TrainSuccessAction = {
  type: typeof TRAIN_SUCCESS;
};

export const TRAIN_FAILED = 'TRAIN_FAILED';
export type TrainFailedAction = {
  type: typeof TRAIN_FAILED;
};

export type ChangeStatusAction = {
  type: 'CHANGE_STATUS';
  status: Status;
};

export type ProjectActionTypes =
  | GetProjectRequestAction
  | GetProjectSuccessAction
  | GetProjectFailedAction
  | PostProjectRequestAction
  | PostProjectSuccessAction
  | PostProjectFaliedAction
  | UpdateProjectDataAction
  | GetTrainingMetricsRequestAction
  | GetTrainingMetricsSuccessAction
  | GetTrainingMetricsFailedAction
  | StartInferenceAction
  | StopInferenceAction
  | TrainSuccessAction
  | TrainFailedAction
  | ChangeStatusAction;

// Describing the different THUNK ACTION NAMES available
export type ProjectThunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, Action<string>>;
