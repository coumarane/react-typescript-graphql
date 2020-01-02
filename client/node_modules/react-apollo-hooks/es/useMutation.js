function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { ApolloError } from 'apollo-client';
import React from 'react';
import { useApolloClient } from './ApolloContext';
import actHack from './internal/actHack';
import { objToKey } from './utils';

var getInitialState = function getInitialState() {
  return {
    called: false,
    data: undefined,
    error: undefined,
    hasError: false,
    loading: false
  };
};

export function useMutation(mutation, baseOptions) {
  if (baseOptions === void 0) {
    baseOptions = {};
  }

  var client = useApolloClient(baseOptions.client);

  var _React$useState = React.useState(getInitialState),
      result = _React$useState[0],
      setResult = _React$useState[1];

  var _baseOptions = baseOptions,
      _baseOptions$rethrow = _baseOptions.rethrow,
      rethrow = _baseOptions$rethrow === void 0 ? true : _baseOptions$rethrow,
      options = _objectWithoutPropertiesLoose(_baseOptions, ["rethrow"]);

  var mergeResult = function mergeResult(partialResult) {
    // A hack to get rid React warnings during tests.
    actHack(function () {
      setResult(function (prev) {
        return _extends({}, prev, {}, partialResult);
      });
    });
  }; // reset state if client instance changes


  React.useEffect(function () {
    mergeResult(getInitialState());
  }, [client]);

  var _useMutationTracking = useMutationTracking(),
      generateNewMutationId = _useMutationTracking.generateNewMutationId,
      isMostRecentMutation = _useMutationTracking.isMostRecentMutation;

  var onMutationStart = function onMutationStart() {
    if (!result.loading) {
      mergeResult({
        called: true,
        data: undefined,
        error: undefined,
        hasError: false,
        loading: true
      });
    }
  };

  var onMutationError = function onMutationError(error, mutationId) {
    if (isMostRecentMutation(mutationId)) {
      mergeResult({
        error: error,
        hasError: true,
        loading: false
      });
    }
  };

  var onMutationCompleted = function onMutationCompleted(response, mutationId) {
    var data = response.data,
        errors = response.errors;

    if (errors && errors.length > 0) {
      onMutationError(new ApolloError({
        graphQLErrors: errors
      }), mutationId);
      return;
    }

    if (isMostRecentMutation(mutationId)) {
      mergeResult({
        data: data,
        loading: false
      });
    }
  };

  var runMutation = React.useCallback(function (mutateOptions) {
    if (mutateOptions === void 0) {
      mutateOptions = {};
    }

    return new Promise(function (resolve, reject) {
      onMutationStart();
      var mutationId = generateNewMutationId(); // merge together variables from baseOptions (if specified)
      // and the execution

      var mutateVariables = options.variables ? _extends({}, mutateOptions.variables, {}, options.variables) : mutateOptions.variables;
      client.mutate(_extends({
        mutation: mutation
      }, options, {}, mutateOptions, {
        variables: mutateVariables
      })).then(function (response) {
        onMutationCompleted(response, mutationId);
        resolve(response);
      })["catch"](function (err) {
        onMutationError(err, mutationId);

        if (rethrow) {
          reject(err);
          return;
        }

        resolve({});
      });
    });
  }, [client, mutation, objToKey(baseOptions)]);
  return [runMutation, result];
}

function useMutationTracking() {
  var mostRecentMutationId = React.useRef(0);

  var generateNewMutationId = function generateNewMutationId() {
    mostRecentMutationId.current += 1;
    return mostRecentMutationId.current;
  };

  var isMostRecentMutation = function isMostRecentMutation(mutationId) {
    return mostRecentMutationId.current === mutationId;
  };

  return {
    generateNewMutationId: generateNewMutationId,
    isMostRecentMutation: isMostRecentMutation
  };
}