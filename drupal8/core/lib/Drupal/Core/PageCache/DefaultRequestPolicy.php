<?php

/**
 * @file
 * Contains \Drupal\Core\PageCache\DefaultRequestPolicy.
 */

namespace Drupal\Core\PageCache;

/**
 * The default page cache request policy.
 *
 * Delivery of cached pages is denied if either the application is running from
 * the command line or the request was not initiated with a safe method (GET or
 * HEAD). Also caching is only allowed for requests without a session cookie.
 */
class DefaultRequestPolicy extends ChainRequestPolicy {

  /**
   * Constructs the default page cache request policy.
   */
  public function __construct() {
    $this->addPolicy(new RequestPolicy\CommandLineOrUnsafeMethod());
    $this->addPolicy(new RequestPolicy\NoSessionOpen());
  }

}
