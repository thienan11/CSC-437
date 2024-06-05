import { define, View } from "@calpoly/mustang";
import { css, html, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import {
  StudySpot,
  Review
} from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class StudySpotViewElement extends View<Model, Msg> {
  static uses = define({
    
  });

  @property({ attribute: "spot-id", reflect: true })
  spotid = "";

  @state()
  get studySpot(): StudySpot | undefined {
    return this.model.studySpot;
  }

  constructor() {
    super("slostudyspots:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "spot-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Study Spot Page:", newValue);
      this.dispatchMessage([
        "study-spot/select",
        { spotid: newValue }
      ]);
    }
  }

  render(): TemplateResult {
    const {
      name,
      address,
      locationType,
      hoursOfOperation,
      ratings,
      tags,
      photos,
      link,
    } = this.studySpot || {};


    console.log("Rendering study spot page", this.studySpot);

    return html`
      <main>
        <section class="gallery-preview">
          <img src="${photos?.[0] || '../images/default-image.jpg'}" alt="View of ${name}" class="featured-image">
          <div class="view-gallery-overlay">
            <h2 class="spot-title">${name}</h2>
            <a href="${link || '#'}" class="btn-view-gallery">
              <img src="../icons/default-photo.svg" alt="Gallery Icon">
              View Gallery
            </a>
          </div>
        </section>

        <section class="study-spot-actions">
          <!-- Actions can be modified similarly -->
        </section>

        <div class="details-reviews-container">
          <div class="details-ratings">
            <section class="spot-details">
              <!-- Dynamically generate details -->
            </section>
            <section class="rating-breakdown">
              <!-- Dynamically generate rating breakdown -->
            </section>
          </div>
          <section class="user-reviews">
            <h3>User Reviews</h3>
            
          </section>
        </div>
      </main>
    `;
  }

  static styles = [
    css`
      .gallery-preview {
        position: relative;
        /* are the below needed? */
        width: 100%; /* Full width */
        margin: 0 auto; /* Center aligning */
      }
      
      .featured-image {
        width: 100%;
        display: block;
        height: 300px;
        object-fit: cover;
      }
      
      .view-gallery-overlay {
        position: absolute;
        bottom: 0;
        left: 0; /* not needed? */
        width: 100%;
        background: linear-gradient(to top, rgba(0,0,0,0.8) 10%, transparent 90%);
        padding: 10px 20px;
      }
      
      .spot-title {
        color: white;
        font-size: 2rem;
      }
      
      .btn-view-gallery {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 10px;
        right: 20px;
        color: #333;
        background-color: #fff;
        padding: 8px 16px;
        border-radius: var(--border-radius);
        text-decoration: none;
      }
      
      .btn-view-gallery img {
        height: 20px;
        width: auto;
        margin-right: 8px;
      }
      
      .btn-view-gallery:hover {
        filter: brightness(0.9);
      }
      
      .study-spot-actions {
        text-align: center;
        padding: 10px 0;
      }
      
      .btn-add-photo, .btn-write-review {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-primary);
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: var(--border-radius);
        margin: 0 10px;
      }
      
      .btn-add-photo:hover, .btn-write-review:hover, .feature-tag:hover {
        background-color: var(--color-links);
        cursor: pointer; /* prob not needed for tags once it can be clicked */
      }
      
      .btn-icon-white {
        height: 20px;
        width: auto;
        margin-right: 8px;
        filter: brightness(0) invert(1);
      }
      
      .details-reviews-container {
        display: flex;
        justify-content: space-between; /* might not need? */
        margin-top: 20px;
      }
      
      .feature-tag {
        display: inline-block;
        background-color: var(--color-tags);
        color: #fff;
        border-radius: var(--border-radius);
        padding: 5px 10px;
        margin: 2px;
        font-size: 0.875rem;
        text-transform: capitalize;
      }

      /* Details and Ratings Container Styles */
      .details-ratings {
        flex: 1;
        padding-right: 10px;
      }
      
      .details-ratings h3 {
        color: var(--color-primary);
      }
      
      .spot-details, .rating-breakdown {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
      }
      
      /* .rating-breakdown {
        padding-top: 20px; /* Space at the top to separate from details *
      } */
      
      .overall-rating-image-container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      
      .star-icon {
        width: 24px;
        height: auto;
        margin-right: 5px;
      }
      
      .rating-value {
        font-size: 1.5rem;
        color: var(--color-primary);
      }
      
      .rating-breakdown p {
        margin: 5px 0;
      }
      
      .rating-breakdown h3 {
        color: var(--color-primary);
      }
      
      /* User Reviews Styles */
      .user-reviews {
        flex: 2;
        padding-left: 10px;
      }
      
      .user-reviews h3 {
        color: var(--color-primary);
      }
      
      .review {
        background-color: var(--color-background-secondary);
        /* border: 1px solid #ddd; */
        box-shadow: var(--shadow-hover-small);
        margin-top: 20px;
        padding: 10px;
        border-radius: var(--border-radius);
      }
      
      .review ul {
        margin: 10px 0 0 15px;
      }
    
    `
  ];
}